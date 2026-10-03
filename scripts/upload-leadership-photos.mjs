import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load environment variables from .env.local or .env
function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    const fullPath = path.join(rootDir, file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  }
}

loadEnv();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error('Missing Cloudinary configuration in .env.local or environment');
  process.exit(1);
}

const leadershipFolder = 'balasangham/leadership';

const photos = [
  {
    order: 1,
    name: 'M.P. Gokul',
    nameMl: 'എം. പി. ഗോകുൽ',
    role: 'District Secretary',
    roleMl: 'ജില്ലാ സെക്രട്ടറി',
    file: 'WhatsApp Image 2026-09-30 at 6.32.52 AM.jpeg',
    publicId: 'kannur_gokul_mp'
  },
  {
    order: 2,
    name: 'Darshana Sanoj',
    nameMl: 'ദർശന സനോജ്',
    role: 'Vice President',
    roleMl: 'വൈസ് പ്രസിഡന്റ്',
    file: 'WhatsApp Image 2026-09-30 at 6.33.10 AM.jpeg',
    publicId: 'kannur_darshana_sanoj'
  },
  {
    order: 3,
    name: 'K.V. Aadith',
    nameMl: 'കെ. വി. ആദിത്ത്',
    role: 'Joint Secretary',
    roleMl: 'ജോയിന്റ് സെക്രട്ടറി',
    file: 'WhatsApp Image 2026-09-30 at 6.33.27 AM.jpeg',
    publicId: 'kannur_kv_aadith'
  },
  {
    order: 4,
    name: 'Amal Prem',
    nameMl: 'അമൽ പ്രേം',
    role: 'Vice President',
    roleMl: 'വൈസ് പ്രസിഡന്റ്',
    file: 'WhatsApp Image 2026-09-30 at 6.33.49 AM.jpeg',
    publicId: 'kannur_amal_prem'
  },
  {
    order: 5,
    name: 'K. Surya',
    nameMl: 'കെ. സൂര്യ',
    role: 'District President',
    roleMl: 'ജില്ലാ പ്രസിഡന്റ്',
    file: 'WhatsApp Image 2026-09-30 at 6.34.28 AM.jpeg',
    publicId: 'kannur_k_surya'
  },
  {
    order: 6,
    name: 'Anuvind Ayithara',
    nameMl: 'അനുവിന്ദ് ആയിത്തര',
    role: 'District Coordinator',
    roleMl: 'ജില്ലാ കോഓർഡിനേറ്റർ',
    file: 'WhatsApp Image 2026-09-30 at 6.34.54 AM.jpeg',
    publicId: 'kannur_anuvind_ayithara'
  },
  {
    order: 7,
    name: 'P. Sumeshan Master',
    nameMl: 'പി. സുമേശൻ മാസ്റ്റർ',
    role: 'District Convener',
    roleMl: 'ജില്ലാ കൺവീനർ',
    file: 'WhatsApp Image 2026-09-30 at 6.35.19 AM.jpeg',
    publicId: 'kannur_p_sumeshan'
  },
  {
    order: 8,
    name: 'Devika S. Dev',
    nameMl: 'ദേവിക എസ്. ദേവ്',
    role: 'Joint Secretary',
    roleMl: 'ജോയിന്റ് സെക്രട്ടറി',
    file: 'WhatsApp Image 2026-09-30 at 6.35.41 AM.jpeg',
    publicId: 'kannur_devika_s_dev'
  }
];

async function uploadPhoto(item) {
  const filePath = path.join(rootDir, 'photos of the people', item.file);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const fullPublicId = `${item.publicId}`;
  
  // Cloudinary signature parameters must be sorted alphabetically
  const paramsToSign = `folder=${leadershipFolder}&overwrite=true&public_id=${fullPublicId}&timestamp=${timestamp}`;
  const signature = crypto.createHash('sha1').update(paramsToSign + apiSecret).digest('hex');

  const fileBuffer = fs.readFileSync(filePath);
  const blob = new Blob([fileBuffer], { type: 'image/jpeg' });

  const formData = new FormData();
  formData.append('file', blob, item.file);
  formData.append('api_key', apiKey);
  formData.append('timestamp', timestamp.toString());
  formData.append('folder', leadershipFolder);
  formData.append('public_id', fullPublicId);
  formData.append('overwrite', 'true');
  formData.append('signature', signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Upload failed for ${item.name} (${res.status}): ${errorText}`);
  }

  const data = await res.json();
  return {
    ...item,
    metadata: {
      publicId: data.public_id,
      secureUrl: data.secure_url,
      width: data.width,
      height: data.height,
      format: data.format
    }
  };
}

async function main() {
  console.log(`Starting Cloudinary upload for ${photos.length} leadership photos...`);
  console.log(`Target Cloudinary Folder: ${leadershipFolder}`);

  const results = [];
  for (const item of photos) {
    process.stdout.write(`Uploading [${item.order}/8] ${item.name} (${item.role})... `);
    const uploaded = await uploadPhoto(item);
    console.log(`DONE: ${uploaded.metadata.secureUrl}`);
    results.push(uploaded);
  }

  const outputJsonPath = path.join(rootDir, 'src', 'data', 'leadershipCloudinary.json');
  fs.writeFileSync(outputJsonPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\nAll photos uploaded successfully! Metadata saved to ${outputJsonPath}`);
}

main().catch((err) => {
  console.error('\nUpload error:', err);
  process.exit(1);
});
