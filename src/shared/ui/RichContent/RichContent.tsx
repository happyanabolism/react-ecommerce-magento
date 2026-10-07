import DOMPurify from 'dompurify';
import { useMemo } from 'react';

interface RichContentProps {
  html: string | null | undefined;
  className?: string;
}

export const RichContent = ({ html, className }: RichContentProps) => {
  const safeHtml = useMemo(
    () => (html ? DOMPurify.sanitize(html) : ''),
    [html]
  );
  if (!safeHtml) return null;

  return (
    <div dangerouslySetInnerHTML={{ __html: safeHtml }} className={className} />
  );
};
