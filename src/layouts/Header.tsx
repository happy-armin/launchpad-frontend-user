import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ConnectWallet from '../components/ConnectWallet';

import '../styles/layouts/header.scss';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? 'is-sticky' : ''}`}>
      <Link to="/" className="header__logo">
        LaunchPad
      </Link>
      <div className="header-right-bar">
        <ConnectWallet />
      </div>
    </header>
  );
}
