import type { ProductImage as ProductImageType } from '@shared/types';

interface ProductImageProps {
  className?: string;
  image?: ProductImageType;
  productName?: string;
}

export const ProductImage = ({
  className,
  image,
  productName,
}: ProductImageProps) => {
  if (!image || !image?.url || image?.url.length === 0) {
    return <>Placeholder Image</>;
  }

  return (
    <img
      className={className}
      src={image.url}
      alt={productName}
      title={productName}
    />
  );
};
