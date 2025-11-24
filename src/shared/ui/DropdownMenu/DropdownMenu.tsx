import {
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type MouseEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { DropdownMenuItem } from '@shared/ui';
import styles from './DropdownMenu.module.scss';

interface DropdownMenuProps {
  anchorEl: HTMLElement | null;
  onClose: (event: MouseEvent<HTMLDivElement>) => void;
  children:
    | ReactElement<typeof DropdownMenuItem>
    | ReactElement<typeof DropdownMenuItem>[];
}

export const DropdownMenu = ({
  anchorEl,
  onClose,
  children,
}: DropdownMenuProps) => {
  const open = anchorEl !== null;
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (!anchorEl) return;

    const updateMenuPosition = () => {
      const anchorPosition = anchorEl.getBoundingClientRect();
      setPosition({
        x: window.scrollX + anchorPosition.left,
        y: window.scrollY + anchorPosition.bottom,
      });
    };

    updateMenuPosition();
    window.addEventListener('resize', updateMenuPosition);
    return () => {
      window.removeEventListener('resize', updateMenuPosition);
    };
  }, [anchorEl]);

  if (!open || !position) return null;

  return createPortal(
    <div className={styles.dropdownMenuPortal}>
      <div className={styles.dropdownBackdrop} onClick={onClose}></div>
      <div
        className={styles.dropdown}
        style={
          {
            '--dropdown-left': `${position.x}px`,
            '--dropdown-top': `${position.y}px`,
          } as React.CSSProperties & { [key: `--${string}`]: string }
        }
        ref={ref}
      >
        <ul className={styles.dropdownItems}>{children}</ul>
      </div>
    </div>,
    document.body
  );
};
