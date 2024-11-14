import React from 'react';

import './index.scss';

interface IButtonProps {
  text: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function PrimaryButton({ text, onClick, style }: IButtonProps) {
  return (
    <button className="primary-button" onClick={onClick} style={style}>
      {text}
    </button>
  );
}
