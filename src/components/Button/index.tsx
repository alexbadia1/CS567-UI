import React from 'react';

import './index.scss';

interface IButtonProps {
  text: string;
  classnames?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export function Button({
  text,
  onClick,
  classnames,
  style,
  disabled = false,
}: IButtonProps) {
  return (
    <button className={classnames} onClick={onClick} style={style} disabled={disabled}>
      {text}
    </button>
  );
}
