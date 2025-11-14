import { HTMLAttributes, ReactNode } from 'react';
export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the modal is open */
  open: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Show close button */
  showCloseButton?: boolean;
  /** Close on backdrop click */
  closeOnBackdropClick?: boolean;
  /** Close on escape key */
  closeOnEscape?: boolean;
  /** Footer content */
  footer?: ReactNode;
}
declare const Modal: import('react').ForwardRefExoticComponent<
  ModalProps & import('react').RefAttributes<HTMLDivElement>
>;
export default Modal;
//# sourceMappingURL=Modal.d.ts.map
