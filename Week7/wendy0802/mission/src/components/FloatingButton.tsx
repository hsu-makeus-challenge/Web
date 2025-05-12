import React from 'react';
import { createPortal } from 'react-dom';

interface FloatingButtonProps {
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick }) => {
  return createPortal(
    <button 
      onClick={onClick}
      style={{
        borderTop: '1px solid #0d6717',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        borderRadius: '100px',
        border: '1px solid rgba(0,0,0,0.2)',
        backgroundColor: 'green',
        color: 'white',
        cursor: 'pointer',
        fontSize: '30px',
        fontWeight: 'bold',
      }}
      aria-label="Add LP"
    >
      +
    </button>,
    document.body
  );
};

export default FloatingButton; 