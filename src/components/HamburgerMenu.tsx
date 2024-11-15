import React, { useState } from 'react';

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
        <a href="#" className="menu-item">
          Create Pool
        </a>
        <a href="#" className="menu-item">
          Block List
        </a>
      </nav>
    </div>
  );
}
