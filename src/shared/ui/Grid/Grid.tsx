import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Grid.module.scss';

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  columns?: number;
  gap?: number;
  children: ReactNode;
}

export const Grid = ({
  columns = 4,
  gap = 8,
  className,
  children,
  ...rest
}: GridProps) => {
  const gridStyle: CSSProperties & { [key: `--${string}`]: string | number } = {
    '--grid-columns': columns,
    '--grid-gap': `${gap}px`,
  };

  return (
    <div className={clsx(styles.grid, className)} style={gridStyle} {...rest}>
      {children}
    </div>
  );
};
