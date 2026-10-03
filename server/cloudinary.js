const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log('Cloudinary configured successfully.');
} else {
  console.warn('NOTE: Cloudinary environment variables missing. Using persistent local storage fallback for development.');
}

// Dedicated folders
const FOLDERS = {
  IMAGES: 'balasangham/media/images',
  VIDEOS: 'balasangham/media/videos',
  EVENTS: 'balasangham/events',
  LEADERSHIP: 'balasangham/leadership'
};

/**
 * Universal media upload for images and videos
 */
async function uploadMedia(filePath, options = {}) {
  const ext = path.extname(filePath).toLowerCase();
  const isVideo = options.resourceType === 'video' || 
                  options.type === 'video' || 
                  ['.mp4', '.webm', '.mov', '.mkv'].includes(ext);

  const resourceType = isVideo ? 'video' : 'image';
  const targetFolder = options.folder || (isVideo ? FOLDERS.VIDEOS : FOLDERS.IMAGES);

  // If Cloudinary is not configured, fall back to local disk storage
  if (!isCloudinaryConfigured) {
    const filename = path.basename(filePath);
    const publicUploads = path.join(__dirname, '..', 'public', 'uploads');
    if (!fs.existsSync(publicUploads)) {
      fs.mkdirSync(publicUploads, { recursive: true });
    }
    const dest = path.join(publicUploads, filename);
    fs.copyFileSync(filePath, dest);

    return {
      secure_url: `/uploads/${filename}`,
      public_id: `local_${filename}`,
      width: isVideo ? 1920 : 1200,
      height: isVideo ? 1080 : 800,
      format: ext.replace('.', '') || (isVideo ? 'mp4' : 'jpg'),
      resource_type: resourceType,
      duration: isVideo ? 60 : null,
      thumbnail_url: isVideo ? '/images/video-placeholder.jpg' : `/uploads/${filename}`
    };
  }

  try {
    const uploadOptions = {
      folder: targetFolder,
      resource_type: resourceType,
      timeout: 120000 // 2 minutes for larger videos
    };

    if (isVideo) {
      uploadOptions.chunk_size = 6000000; // 6MB chunks for videos
    }

    const result = await cloudinary.uploader.upload(filePath, uploadOptions);

    let thumbnailUrl = null;
    if (result.resource_type === 'video') {
      thumbnailUrl = cloudinary.url(result.public_id, {
        resource_type: 'video',
        format: 'jpg',
        transformation: [
          { width: 640, crop: 'scale' },
          { quality: 'auto' }
        ]
      });
    } else {
      thumbnailUrl = cloudinary.url(result.public_id, {
        resource_type: 'image',
        fetch_format: 'auto',
        quality: 'auto',
        transformation: [
          { width: 400, crop: 'scale' }
        ]
      });
    }

    return {
      ...result,
      secure_url: result.secure_url,
      public_id: result.public_id,
      width: result.width || (isVideo ? 1920 : 1200),
      height: result.height || (isVideo ? 1080 : 800),
      duration: result.duration || null,
      format: result.format || ext.replace('.', ''),
      resource_type: result.resource_type || resourceType,
      thumbnail_url: thumbnailUrl
    };
  } catch (error) {
    console.error('Cloudinary media upload error:', error);
    throw error;
  }
}

/**
 * Legacy uploadImage function
 */
async function uploadImage(filePath, folder) {
  return uploadMedia(filePath, { folder: folder || FOLDERS.IMAGES, resourceType: 'image' });
}

/**
 * Delete media asset from Cloudinary
 */
async function deleteMedia(publicId, resourceType = 'image') {
  if (!publicId || publicId.startsWith('local_')) {
    return { result: 'ok' };
  }

  // CRITICAL SECURITY RULE: Leadership profile photos must NEVER be deleted through general media management!
  if (publicId.startsWith('balasangham/leadership/') || publicId.startsWith(FOLDERS.LEADERSHIP)) {
    throw new Error('Unauthorized: Leadership photos cannot be modified or deleted via media management.');
  }

  if (!isCloudinaryConfigured) return { result: 'ok' };

  try {
    const isVideo = resourceType === 'video' || publicId.includes('/videos/');
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: isVideo ? 'video' : 'image'
    });
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
}

/**
 * Legacy deleteImage function
 */
async function deleteImage(publicId) {
  return deleteMedia(publicId, 'image');
}

/**
 * Generate responsive image URL with Cloudinary transformations
 */
function getResponsiveUrl(publicId, width, resourceType = 'image') {
  if (!publicId || publicId.startsWith('local_')) return null;
  if (!isCloudinaryConfigured) return null;
  return cloudinary.url(publicId, {
    resource_type: resourceType,
    width: width || 800,
    crop: 'scale',
    fetch_format: 'auto',
    quality: 'auto'
  });
}

/**
 * Generate thumbnail / poster URL
 */
function getThumbnailUrl(publicId, resourceType = 'image') {
  if (!publicId || publicId.startsWith('local_')) return null;
  if (!isCloudinaryConfigured) return null;

  if (resourceType === 'video' || publicId.includes('/videos/')) {
    return cloudinary.url(publicId, {
      resource_type: 'video',
      format: 'jpg',
      transformation: [
        { width: 400, crop: 'scale' },
        { quality: 'auto' }
      ]
    });
  }

  return cloudinary.url(publicId, {
    resource_type: 'image',
    width: 350,
    crop: 'scale',
    fetch_format: 'auto',
    quality: 'auto'
  });
}

/**
 * Generate video poster URL
 */
function getVideoPosterUrl(publicId) {
  if (!publicId || publicId.startsWith('local_')) return null;
  if (!isCloudinaryConfigured) return null;

  return cloudinary.url(publicId, {
    resource_type: 'video',
    format: 'jpg',
    transformation: [
      { width: 800, crop: 'scale' },
      { quality: 'auto' }
    ]
  });
}

module.exports = {
  uploadMedia,
  uploadImage,
  deleteMedia,
  deleteImage,
  getResponsiveUrl,
  getThumbnailUrl,
  getVideoPosterUrl,
  isCloudinaryConfigured,
  FOLDERS
};
