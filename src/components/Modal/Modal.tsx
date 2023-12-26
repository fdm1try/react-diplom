import './Modal.css';
import { IModalBase } from './ModalBase';
import { ModalInfo } from './ModalInfo';
import { ModalError } from './ModalError';

export interface IModal extends IModalBase {
  variant?: 'info' | 'error';
}

export const Modal: React.FC<IModal> = (props) => {
  switch (props.variant) {
    case 'info': return <ModalInfo {...props} />;
    case 'error': return <ModalError {...props} />;
    default: return <ModalInfo {...props} />
  }
}
