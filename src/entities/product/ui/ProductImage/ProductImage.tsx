interface ProductImageProps {
  className?: string;
  url?: string | null;
  alt?: string | null;
}

export const ProductImage = ({ className, url, alt }: ProductImageProps) => {
  if (!url) {
    return <>Placeholder Image</>;
  }

  return <img className={className} src={url} alt={alt ?? ''} />;
};
