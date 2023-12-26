import { useState } from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';

export interface IModalBase {
  title?: string;
  className?: string;
  children?: React.ReactNode;
  controls?: Array<React.ReactNode>;
  onHide?: () => void;
}

export const ModalBase: React.FC<IModalBase> = (props) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    props.onHide && props.onHide();
  }

  return (
    <BootstrapModal className={props.className || ''} show={show} onHide={handleClose}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{props.title || ''}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        {props.children}
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
        {props.controls}
      </BootstrapModal.Footer>
    </BootstrapModal>
  )
}
