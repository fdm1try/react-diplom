import React, { useState } from 'react';
import { IError } from './Error';
import { Modal } from '../Modal';

export const ErrorInline: React.FC<IError> = (props) => {
  const [details, setDetails] = useState<string>();

  const handleInfoClick = () => {
    setDetails(props.details);
  }

  const handleDetailsModalHide = () => {
    setDetails(undefined);
  }

  return (
    <>
      { details && <Modal title='Подробности ошибки' onHide={handleDetailsModalHide}> {details} </Modal> }
      <div className='text-center error'>
        <span className='error__title'>Ошибка</span>
        <span className='error__message'>
          {props.message}        
        </span>
        <span className='error__controls'>
          { props.details && <button onClick={handleInfoClick} className='error__controls-button error__controls_info'>i</button> }
          { props.onRetry && <button onClick={props.onRetry}className='error__controls-button error__controls_retry'>⟳</button> }
        </span>
      </div>
    </>
  )
}
