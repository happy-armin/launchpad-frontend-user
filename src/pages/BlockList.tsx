import React from 'react';

import '../styles/pages/block-list.scss';
import '../styles/layouts/app.scss';
import Button from '../components/Button';

export default function BlockList() {
  const handleClick = () => {};

  const data = [
    '0x3D5D4E7F1A5F2B8D9C3E1A0F1B4D5E6F7A8B9C0D',
    '0x9F8A6B4C2E7D1A5B8C3F2E4D6A1B0C9D8E7F6A5',
    '0x1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S0',
    '0x4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9G0H1I2J3',
    '0x7C8D9E0F1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6',
  ];

  return (
    <div className="container">
      <div className="block-list">
        <div className="block-list__header">
          <h2 className="header-title">Block List</h2>
          <Button label="Add account" onClick={handleClick} variant="primary"></Button>
        </div>
        <div className="block-list__content">
          <ul className="data-list">
            {data.map((item, index) => (
              <li key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                <span>{item}</span>
                <Button label="remove" onClick={handleClick} variant="secondary"></Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
