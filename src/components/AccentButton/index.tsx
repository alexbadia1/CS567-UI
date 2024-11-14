import React from 'react';

import './index.scss';

interface IButtonProps {
  text: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function AccentButton({ text, onClick, style }: IButtonProps) {
  return (
    <button className="accent-button" onClick={onClick} style={style}>
      {text}
    </button>
  );
}
