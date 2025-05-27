export interface ModalState {
	isOpen: boolean;
}

export interface ModalActions {
	openModal: () => void;
	closeModal: () => void;
}

export type ModalStore = ModalState & ModalActions;
