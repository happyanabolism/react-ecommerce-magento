import { RichContent } from '@shared/ui';

interface ProductDescriptionProps {
  html: string | null | undefined;
}

export const ProductDescription = ({ html }: ProductDescriptionProps) => (
  <RichContent html={html} />
);
