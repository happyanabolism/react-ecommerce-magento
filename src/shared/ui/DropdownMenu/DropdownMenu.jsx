import { useEffect, useRef, useState } from "react";
import styles from "./DropdownMenu.module.scss";
import { createPortal } from "react-dom";

export const DropdownMenu = ({ anchorEl, onClose, children }) => {
  const open = anchorEl !== null;
  const ref = useRef(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!anchorEl) return;

    const updateMenuPosition = () => {
      const anchorPosition = anchorEl.getBoundingClientRect();
      setPosition({
        x: `${window.scrollX + anchorPosition.left}px`,
        y: `${window.scrollY + anchorPosition.bottom}px`
      });
    }

    updateMenuPosition();

    window.addEventListener('resize', updateMenuPosition);
    return () => {
      window.removeEventListener('resize', updateMenuPosition);
    }
  }, [anchorEl])

  if (!open || !position) return null;

  return createPortal(
    <div className={styles.dropdownMenuPortal}>
      <div className={styles.dropdownBackdrop} onClick={onClose}></div>
      <div
        className={styles.dropdown}
        style={{
          '--dropdown-left': position.x,
          '--dropdown-top': position.y
        }}
        ref={ref}
      >
        <ul className={styles.dropdownItems}>
          { children }
        </ul>
      </div>
    </div>,
    document.body
  );
}
