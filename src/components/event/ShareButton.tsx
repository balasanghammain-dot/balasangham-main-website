import { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { useLanguage } from '../../context/LanguageContext';

interface ShareButtonProps {
  title: string;
  url: string;
  className?: string;
  label?: string;
  variant?: 'outline' | 'default' | 'ghost' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const ShareButton = ({ 
  title, 
  url, 
  className,
  label,
  variant = 'outline',
  size = 'default'
}: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();
  const ml = language === 'ml';

  const handleShare = async () => {
    const fullUrl = url.startsWith('http') 
      ? url 
      : `${typeof window !== 'undefined' ? window.location.origin : 'https://balasangham-main-website.vercel.app'}${url.startsWith('/') ? url : `/${url}`}`;

    if (typeof navigator !== 'undefined' && 'share' in navigator && navigator.share) {
      try {
        await navigator.share({
          title,
          text: title,
          url: fullUrl
        });
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        console.warn('Navigator share dismissed or failed, falling back to copy link:', err);
      }
    }

    // Fallback to clipboard
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = fullUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy error:', err);
    }
  };

  const displayText = label || (ml ? 'പരിപാടി പങ്കുവെക്കൂ' : 'Share Event');

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleShare}
      className={`${className || ''} ${ml ? 'font-malayalam' : ''}`}
      title={ml ? 'പരിപാടി പങ്കുവെക്കൂ' : 'Share Event'}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-1.5 text-green-600 shrink-0" />
          <span>{ml ? 'ലിങ്ക് പകർത്തി' : 'Copied!'}</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4 mr-1.5 shrink-0" />
          <span>{displayText}</span>
        </>
      )}
    </Button>
  );
};

