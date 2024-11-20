import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="line"></div>
      </div>
      <nav className={`menu ${isOpen ? 'fade-in' : 'fade-out'}`}>
        <Link to="/create" className="menu-item">
          Create Pool
        </Link>
        <Link to="/pools" className="menu-item">
          IDOs
        </Link>
        <Link to="/block" className="menu-item">
          Block List
        </Link>
      </nav>
    </div>
  );
}
