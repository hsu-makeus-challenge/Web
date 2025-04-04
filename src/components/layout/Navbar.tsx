import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ 
      padding: '1rem', 
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #dee2e6'
    }}>
      <Link to="/" style={{ 
        textDecoration: 'none', 
        color: '#212529',
        fontSize: '1.2rem',
        fontWeight: 'bold'
      }}>
        홈
      </Link>
    </nav>
  );
};

export default Navbar; 