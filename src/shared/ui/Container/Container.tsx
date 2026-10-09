import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from 'cn';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

export const Container = ({ className, children, ...rest }: ContainerProps) => {
  return (
    <div
      className={cn('mx-auto w-full max-w-layout px-4 xl:px-7.5', className)}
      {...rest}
    >
      {children}
    </div>
  );
};
