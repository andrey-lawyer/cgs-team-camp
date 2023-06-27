import React, { createContext, useState } from 'react';
import { IModalContext } from '../../types/props.types';

export const ModalContext = createContext<IModalContext>({
  modal: false,
  open: () => {},
  close: () => {}
});

export const ModalState = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState(false);

  const open = () => setModal(true);

  const close = () => setModal(false);

  return <ModalContext.Provider value={{ modal, open, close }}>{children}</ModalContext.Provider>;
};
