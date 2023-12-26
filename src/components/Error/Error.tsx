import './Error.css';
import { ErrorInline } from './ErrorInline';
import { ErrorModal } from './ErrorModal';

import React from 'react'

export interface IError {
  message: string;
  variant?: 'modal' | 'inline';
  details?: string;
  onClose?: () => void;
  onRetry?: () => void;
}

export const Error: React.FC<IError> = (props) => {
  switch (props.variant) {
    case 'modal': return <ErrorModal {...props} />;
    case 'inline': return <ErrorInline {...props} />;
    default: return <ErrorModal {...props} />;
  }
}
