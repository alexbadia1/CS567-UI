import React from 'react';

import './index.scss';

interface IButtonProps {
  text: string;
  classnames?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export function Button({
  text,
  onClick,
  classnames,
  style,
}: IButtonProps) {
  return (
    <button className={classnames} onClick={onClick} style={style}>
      {text}
    </button>
  );
}
