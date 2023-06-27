import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Overlay } from './portal.styled';
import { IPortalProps } from '../../types/props.types';
import { IClickHandler } from '../../types/handlers';

export const Portal = ({ onClose, children }: IPortalProps) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#modal');
    setMounted(true);
  }, []);

  useEffect(() => {
    const onClickEscape = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onClickEscape);
    return () => {
      document.removeEventListener('keydown', onClickEscape);
    };
  }, [onClose]);

  const handleBackdrop: IClickHandler = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return mounted && ref.current
    ? createPortal(<Overlay onClick={handleBackdrop}>{children}</Overlay>, ref.current)
    : null;
};
