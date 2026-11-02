import { useState, useRef, useEffect } from 'react';
import { Share2, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { useLanguage } from '../../context/LanguageContext';
import { cn } from '../../lib/utils';

interface ShareButtonProps {
  title: string;
  url: string;
  className?: string;
  label?: string;
  variant?: 'outline' | 'default' | 'ghost' | 'secondary' | 'festival';
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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { language } = useLanguage();
  const ml = language === 'ml';

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleShare = async () => {
    const base = typeof window !== 'undefined' ? window.location.origin : 'https://balasangham-main-website.vercel.app';
    const fullUrl = new URL(url, base).toString();

    if (typeof navigator !== 'undefined' && 'share' in navigator && navigator.share) {
      try {
        await navigator.share({
          title,
          text: title,
          url: fullUrl
        });
        return;
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
      }
    }

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = fullUrl;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '0';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (!successful) throw new Error('execCommand failed');
      }
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setCopied(true);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy error:', err);
    }
  };

  const displayText = label || (ml ? 'പരിപാടി പങ്കുവെക്കൂ' : 'Share Event');

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      onClick={handleShare}
      className={cn(className, ml && 'font-malayalam')}
      title={copied ? (ml ? 'ലിങ്ക് പകർത്തി' : 'Copied!') : displayText}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-1.5 text-emerald-600 shrink-0" />
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
