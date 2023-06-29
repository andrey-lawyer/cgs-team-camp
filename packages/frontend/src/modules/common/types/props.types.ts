import { ReactNode } from 'react';
import { ITodoCheck } from './todo.types';

export interface ITodoProps {
  todo: ITodoCheck;
}

export interface IPortalProps {
  children: ReactNode;
  onClose: () => void;
}

export interface IModalContext {
  modal: boolean;
  open: () => void;
  close: () => void;
}

export interface IModalProps {
  todo?: ITodoCheck;
  onClose: () => void;
  type: string;
}

export interface IIsLoggedInContext {
  isLoggedIn: boolean;
  loggedIn: () => void;
  notLoggedIn: () => void;
}
