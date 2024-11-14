import React from 'react';

import './index.scss';
import { PrimaryButton } from '../PrimaryButton';

interface IModalProps {
  show: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}

export function Modal({ show, onCancel, onSubmit, children }: IModalProps) {
  if (show) {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <button className="modal-close" onClick={onCancel}>
            &times;
          </button>
          <div className="modal-content">{children}</div>
          <div className="margin-24" />
          <div className="margin-24" />
          <PrimaryButton text="Save" onClick={onSubmit} />
        </div>
      </div>
    );
  }
}
