import React from 'react';

import './index.scss';

interface IButtonProps {
  text: string;
  onClick?: () => void;
}

function Button({ text, onClick }: IButtonProps) {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
