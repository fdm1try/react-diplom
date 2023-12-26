import { IError } from './Error';
import { Modal } from '../Modal';
import { Button } from 'react-bootstrap';

export const ErrorModal: React.FC<IError> = (props) => {
  const handleClose = () => {
    props.onClose && props.onClose();
  }

  const controls = () => [
    props.onRetry && (
      <Button variant='primary' onClick={props.onRetry}>
        Попробовать ещё раз
      </Button>) || <></>
  ];

  return (
    <Modal controls={controls()} variant='error' onHide={handleClose}>  
      <p className='error__message error-modal'>{props.message}</p>
      <p className='error__details error-modal'>{props.details}</p>
    </Modal>      
  )
}
