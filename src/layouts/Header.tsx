import React from 'react';
import { Link } from 'react-router-dom';

import HamburgerMenu from '../components/HamburgerMenu';

import '../styles/layouts/header.scss';

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        LaunchPad
      </Link>
      <nav className="header__nav">
        <ul>
          <li>
            <Link to="/create">Create Pool</Link>
          </li>
          <li>
            <Link to="/block">Block List</Link>
          </li>
        </ul>
      </nav>
      <HamburgerMenu />
    </header>
  );
}
