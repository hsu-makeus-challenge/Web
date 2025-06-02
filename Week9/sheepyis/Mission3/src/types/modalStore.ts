import type { ModalState } from './modal';

export interface ModalStore extends ModalState {
  openModal: () => void;
  closeModal: () => void;
}
