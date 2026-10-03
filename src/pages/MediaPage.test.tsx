import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LanguageProvider } from '../context/LanguageContext';
import { MediaPage } from './MediaPage';

const renderMediaPage = (initialLanguage: 'en' | 'ml' = 'en') => {
  if (initialLanguage === 'ml') {
    localStorage.setItem('balasangham_lang', 'ml');
  } else {
    localStorage.setItem('balasangham_lang', 'en');
  }

  return render(
    <BrowserRouter>
      <LanguageProvider>
        <MediaPage />
      </LanguageProvider>
    </BrowserRouter>
  );
};

describe('MediaPage Component', () => {
  it('renders visual repository title and media tabs', () => {
    renderMediaPage('en');
    expect(screen.getByText('VISUAL REPOSITORY')).toBeInTheDocument();
    expect(screen.getByText(/Media, Photos & Video Archive/i)).toBeInTheDocument();
    
    // Tab buttons
    expect(screen.getByRole('button', { name: /PHOTOS/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /VIDEOS/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ALL MEDIA/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /POSTERS/i })).toBeInTheDocument();
  });

  it('renders bilingual content correctly in Malayalam', () => {
    renderMediaPage('ml');
    expect(screen.getByText('മീഡിയ & വിഷ്വൽ ആർക്കൈവ്')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ഫോട്ടോകൾ/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /വീഡിയോകൾ/i })).toBeInTheDocument();
  });

  it('displays imported Cloudinary photos from Venalthumbikal 2025 event', () => {
    renderMediaPage('en');
    // Photo tab is default
    expect(screen.getAllByText(/Venalthumbikal 2025 Kannur District Sangamam/i).length).toBeGreaterThan(0);
    
    // Check for photo badges
    const photoBadges = screen.getAllByText('PHOTO');
    expect(photoBadges.length).toBeGreaterThan(0);
  });

  it('switches to videos tab and displays imported Cloudinary videos', () => {
    renderMediaPage('en');
    const videosTab = screen.getByRole('button', { name: /VIDEOS/i });
    fireEvent.click(videosTab);

    expect(screen.getByText(/Balasangham Activities & Video Recordings/i)).toBeInTheDocument();
    
    // Check for video badges
    const videoBadges = screen.getAllByText('VIDEO');
    expect(videoBadges.length).toBeGreaterThan(0);

    // Check specific imported video title
    expect(screen.getByText(/Kathirur Village Committee Carnival Activities/i)).toBeInTheDocument();
  });

  it('opens video player modal when video card is clicked', () => {
    renderMediaPage('en');
    const videosTab = screen.getByRole('button', { name: /VIDEOS/i });
    fireEvent.click(videosTab);

    const videoTitle = screen.getByText(/Kathirur Village Committee Carnival Activities/i);
    const videoCard = videoTitle.closest('article');
    expect(videoCard).not.toBeNull();
    
    if (videoCard) {
      fireEvent.click(videoCard);
      // Dialog should open
      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(screen.getByLabelText(/Close video player/i)).toBeInTheDocument();
    }
  });

  it('does NOT contain any leadership images in media list', () => {
    const { container } = renderMediaPage('en');
    const images = container.querySelectorAll('img');
    images.forEach(img => {
      const src = img.getAttribute('src') || '';
      expect(src).not.toContain('balasangham/leadership/');
      expect(src).not.toContain('photos of the people');
    });
  });
});
