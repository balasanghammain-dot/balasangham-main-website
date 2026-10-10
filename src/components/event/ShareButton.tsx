import { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { Button } from '../ui/button';
import { useLanguage } from '../../context/LanguageContext';

interface ShareButtonProps {
  title: string;
  url: string;
  className?: string;
}

export const ShareButton = ({ title, url, className }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);
  const { language } = useLanguage();
  const ml = language === 'ml';

  const handleShare = async () => {
    if ('share' in navigator && navigator.share) {
      try {
        await navigator.share({
          title,
          url
        });
      } catch (err) {
        console.error('Share error:', err);
      }
    } else {
      // Fallback to copy link
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Copy error:', err);
      }
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleShare}
      className={`${className || ''} ${ml ? 'font-malayalam' : ''}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-2 text-green-600 shrink-0" />
          <span>{ml ? 'ലിങ്ക് പകർത്തി' : 'Copied'}</span>
        </>
      ) : (
        <>
          {'share' in navigator ? (
            <Share2 className="w-4 h-4 mr-2 shrink-0" />
          ) : (
            <Copy className="w-4 h-4 mr-2 shrink-0" />
          )}
          <span>{ml ? 'പങ്കുവെക്കൂ' : 'Share'}</span>
        </>
      )}
    </Button>
  );
};
