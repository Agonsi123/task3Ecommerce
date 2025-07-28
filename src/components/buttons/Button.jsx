import React from 'react';
import './button.scss';

const Button = ({onClick, children}) => {
  return (
    <button onClick={onClick} className='btn'>
        {children}
    </button>
  )
}

export default Button