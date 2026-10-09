import type { ReactNode } from 'react';

interface SidebarLayoutProps {
  sidebar: ReactNode;
  content: ReactNode;
}

export const SidebarLayout = ({ sidebar, content }: SidebarLayoutProps) => {
  return (
    <div className='flex flex-col gap-6 md:flex-row md:gap-8'>
      <aside className='md:w-64 md:shrink-0'>{sidebar}</aside>
      <div className='min-w-0 flex-1'>{content}</div>
    </div>
  );
};
