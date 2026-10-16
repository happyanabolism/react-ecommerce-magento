interface ProductTitleProps {
  name: string | null;
}

export const ProductTitle = ({ name }: ProductTitleProps) => <h1>{name}</h1>;
