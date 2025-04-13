import { useEffect } from 'react';
import './Modal.styles.scss';
import ReactDOM from 'react-dom';

interface ModalTaskFormProps {
  isOpen: boolean;
  handleClose: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
  children: React.ReactNode;
}

const Modal: React.FC<ModalTaskFormProps> = ({
  isOpen,
  handleClose,
  children,
}: ModalTaskFormProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className='modal-overlay' onClick={handleClose}>
      <div className='modal-content' onClick={(event: React.MouseEvent) => event.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
