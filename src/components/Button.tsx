import React from 'react';

import '../styles/components/button.scss';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button(props: ButtonProps) {
  return (
    <button className={`button ${props.variant}`} onClick={props.onClick}>
      {props.label}
    </button>
  );
}
