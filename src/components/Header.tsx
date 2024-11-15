import React from 'react';

import HamburgerMenu from './HamburgerMenu';

import '../styles/header.scss';

export default function Header() {
  return (
    <header className="header">
      <a href="#" className="header__logo">
        LaunchPad
      </a>
      <nav className="header__nav">
        <ul>
          <li>
            <a href="#">Create Pool</a>
          </li>
          <li>
            <a href="#">Block List</a>
          </li>
        </ul>
      </nav>
      <HamburgerMenu />
    </header>
  );
}
