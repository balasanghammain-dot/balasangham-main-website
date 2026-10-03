import { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { Button } from '../ui/button';

interface ShareButtonProps {
  title: string;
  url: string;
  className?: string;
}

export const ShareButton = ({ title, url, className }: ShareButtonProps) => {
  const [copied, setCopied] = useState(false);

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
      className={className}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-2 text-green-600" />
          Copied
        </>
      ) : (
        <>
          {'share' in navigator ? <Share2 className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
          Share
        </>
      )}
    </Button>
  );
};
