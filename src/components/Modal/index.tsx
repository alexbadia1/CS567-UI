import React from 'react';
import { Button } from '../Button';

import './index.scss';

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
          <div className="modal-content">{children}</div>
          <div className="margin-24" />
          <div className="margin-24" />
          <div className="modal-actions">
            <Button
              classnames="cancel-button"
              text="Cancel"
              onClick={onCancel}
              style={{ width: '48%' }}
            />
            <Button
              classnames="save-button"
              text="Save"
              onClick={onSubmit}
              style={{ width: '48%' }}
            />
          </div>
        </div>
      </div>
    );
  }
}
