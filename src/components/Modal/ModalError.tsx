import React from 'react'
import { ModalBase, IModalBase } from './ModalBase';

export const ModalError: React.FC<IModalBase> = (props) => <ModalBase {...props} title={props.title || 'Ошибка'} className='modal-error' />