import { createPortal } from 'react-dom';
import { Spinner } from '../shadcn/spinner';

export const PageLoader = () => {
  return createPortal(
    <div className='fixed inset-0 z-50 flex cursor-progress items-center justify-center bg-background/60'>
      <Spinner className='size-8' />
    </div>,
    document.body
  );
};
