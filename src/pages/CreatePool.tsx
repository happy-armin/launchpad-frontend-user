import React, { useState } from 'react';

import '../styles/pages/create-pool.scss';
import '../styles/layouts/app.scss';
import DateTimePicker from '../components/DateTimePicker';
import Button from '../components/Button';
import AvatarUpload from '../components/AvatarUpload';

export default function CreatePool() {
  const [dateTime, setDateTime] = useState<Date | null>(new Date());

  const handleClick = () => {};

  const handleDateChange = (date: Date | null) => {
    console.log('Selected Date:', date);
    setDateTime(date);
  };

  const handleFileUpload = (file: File) => {
    console.log('Uploaded File:', file);
  };

  return (
    <div className="container">
      <div className="create-pool">
        <div className="create-pool__header">
          <h2 className="header-title">Create Pool</h2>
          <Button label="Create IDO" onClick={handleClick} variant="primary"></Button>
        </div>
        <div className="create-pool__content">
          <div className="content-section">
            <h3 className="content-section__title">Step 1: Upload reward token avatar via IPFS</h3>
            <div className="content-section__options">
              <div className="option">
                <AvatarUpload onUpload={handleFileUpload} />
                <label htmlFor="rt_avatar">IPFS address: </label>
                <input type="text" id="rt_avatar" placeholder="..." readOnly />
              </div>
            </div>
          </div>
          <div className="content-section">
            <h3 className="content-section__title">Step 2: Set reward token information</h3>
            <div className="content-section__options">
              <div className="option">
                <label htmlFor="rt_name">Name: </label>
                <input type="text" id="rt_name" placeholder="Enter token name" />
              </div>
              <div className="option">
                <label htmlFor="rt_symbol">Symbol: </label>
                <input type="text" id="rt_symbol" placeholder="Enter token symbol" />
              </div>
              <div className="option">
                <label htmlFor="rt_supply">Initial Supply: </label>
                <input type="number" id="rt_supply" placeholder="Enter initial supply" />
              </div>
            </div>
          </div>
          <div className="content-section">
            <h3 className="content-section__title">Step 3: Set relation about reward token and buy token</h3>
            <div className="content-section__options">
              <div className="option">
                <label htmlFor="bt_address">Buy Token Address: </label>
                <input type="text" id="bt_address" placeholder="Enter buy token address" />
              </div>
              <div className="option">
                <label htmlFor="rt_price">Reward Token Price: </label>
                <input type="number" id="rt_price" placeholder="Enter reward token price" />
              </div>
              <div className="option">
                <label htmlFor="softcap">Soft Cap: </label>
                <input type="number" id="softcap" placeholder="Enter soft cap" />
              </div>
              <div className="option">
                <label htmlFor="hardcap">Hard Cap: </label>
                <input type="number" id="hardcap" placeholder="Enter hard cap" />
              </div>
            </div>
          </div>
          <div className="content-section">
            <h3 className="content-section__title">Step 4: Set timestamps</h3>
            <div className="content-section__options">
              <div className="option">
                <label>Start time: </label>
                <DateTimePicker value={dateTime} onChange={handleDateChange} />
              </div>
              <div className="option">
                <label>End time: </label>
                <DateTimePicker value={dateTime} onChange={handleDateChange} />
              </div>
              <div className="option">
                <label>Claim time: </label>
                <DateTimePicker value={dateTime} onChange={handleDateChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
