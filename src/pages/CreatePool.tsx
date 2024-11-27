import React, { useState } from 'react';
import axios from 'axios';

import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../contracts/IDOFactory';

import '../styles/pages/create-pool.scss';
import '../styles/layouts/app.scss';

import DateTimePicker from '../components/DateTimePicker';
import Button from '../components/Button';
import AvatarUpload from '../components/AvatarUpload';
import { TimeStamps } from '../types/types';

const pinataApiKey = 'f3ac091f5be20e1120f2';
const pinataSecretApiKey = '8407ead4bb4fef8118b23f3f53070bc1d967db62a0e2d321c4f952c8df8fc341';

export default function CreatePool() {
  const [file, setFile] = useState<File | null>(null);
  const [ipfsUrl, setIpfsUrl] = useState<string | null>(null);
  const [rewardName, setRewardName] = useState<string | null>(null);
  const [rewardSymbol, setRewardSymbol] = useState<string | null>(null);
  const [rewardSupply, setRewardSupply] = useState<string | 0>(0);
  const [buyToken, setBuyToken] = useState<string | null>(null);
  const [rewardPrice, setRewardPrice] = useState<string | 0>(0);
  const [softCap, setSoftCap] = useState<string | 0>(0);
  const [hardCap, setHardCap] = useState<string | 0>(0);
  const [startDateTime, setStartDateTime] = useState<Date | null>(new Date());
  const [endDateTime, setEndDateTime] = useState<Date | null>(new Date());
  const [claimDateTime, setClaimDateTime] = useState<Date | null>(new Date());

  const getContract = async () => {
    if (window.ethereum) {
      try {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);

        const signer = await web3Provider.getSigner();

        // Initialize the contract with signer
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        return contract;
      } catch (error) {
        console.log(error);
      }
    }
  };

  // handle create IDO pool
  const handleClick = async () => {
    console.log(ipfsUrl);
    // call createIDO function in IDOFactory contract
    if (window.ethereum) {
      // prepare for params
      const univ2Router = '0xa6fed877eB8845A24B361A2C3b80F3D528f91d42';
      const univ2Factory = '0xa6fed877eB8845A24B361A2C3b80F3D528f91d42';

      const timeStamps: TimeStamps = {
        startTimestamp: BigInt(Math.floor((!!startDateTime ? startDateTime.getTime() : 0) / 1000)),
        endTimestamp: BigInt(Math.floor((!!endDateTime ? endDateTime.getTime() : 0) / 1000)),
        claimTimestamp: BigInt(Math.floor((!!claimDateTime ? claimDateTime.getTime() : 0) / 1000)),
      };

      const params = [
        [rewardName, rewardSymbol, rewardSupply.toString()],
        [buyToken, rewardPrice.toString(), buyToken, 0, softCap.toString(), hardCap.toString()],
        timeStamps,
        [univ2Router, univ2Factory],
        ipfsUrl,
      ];

      console.log(params);

      const idoFactory = await getContract();
      if (idoFactory) {
        try {
          const tx = await idoFactory.createIDO(
            [rewardName, rewardSymbol, rewardSupply.toString()],
            [buyToken, rewardPrice.toString(), buyToken, 0, softCap.toString(), hardCap.toString()],
            timeStamps,
            [univ2Router, univ2Factory],
            ipfsUrl
          );
          await tx.wait();
        } catch (error) {
          console.log(error);
          alert('Transaction failed. Please try again.');
        }
      }
    }
  };

  // function to upload the file to IPFS using Pinata API
  const handleFileUpload = (file: File) => {
    setFile(file);
  };
  const handleUploadToIPFS = async () => {
    if (!file) return;

    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        },
      });
      const ipfsHash = response.data.IpfsHash;
      setIpfsUrl(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
      console.log(ipfsHash);
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
    }
  };

  // set token infos
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetId = event.target.id;

    switch (targetId) {
      case 'rt_name':
        setRewardName(event.target.value);
        break;
      case 'rt_symbol':
        setRewardSymbol(event.target.value);
        break;
      case 'rt_supply':
        setRewardSupply(event.target.value);
        break;
      case 'bt_address':
        setBuyToken(event.target.value);
        break;
      case 'rt_price':
        setRewardPrice(event.target.value);
        break;
      case 'softcap':
        setSoftCap(event.target.value);
        break;
      case 'hardcap':
        setHardCap(event.target.value);
        break;
      default:
        break;
    }
  };

  // set time-stamps
  const handleStartDateChange = (date: Date | null) => {
    setStartDateTime(date);
  };
  const handleEndDateChange = (date: Date | null) => {
    setEndDateTime(date);
  };
  const handleClaimDateChange = (date: Date | null) => {
    setClaimDateTime(date);
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
                <div>
                  <AvatarUpload onUpload={handleFileUpload} />
                  <Button label="upload" onClick={handleUploadToIPFS} variant="primary" />
                  <input
                    type="text"
                    className="fit-width"
                    id="rt_avatar"
                    value={ipfsUrl == null ? '' : ipfsUrl}
                    placeholder="..."
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="content-section">
            <h3 className="content-section__title">Step 2: Set reward token information</h3>
            <div className="content-section__options">
              <div className="option">
                <label htmlFor="rt_name">Name: </label>
                <input type="text" id="rt_name" onChange={handleInputChange} placeholder="Enter token name" />
              </div>
              <div className="option">
                <label htmlFor="rt_symbol">Symbol: </label>
                <input type="text" id="rt_symbol" onChange={handleInputChange} placeholder="Enter token symbol" />
              </div>
              <div className="option">
                <label htmlFor="rt_supply">Initial Supply: </label>
                <input type="number" id="rt_supply" onChange={handleInputChange} placeholder="Enter initial supply" />
              </div>
            </div>
          </div>
          <div className="content-section">
            <h3 className="content-section__title">Step 3: Set relation about reward token and buy token</h3>
            <div className="content-section__options">
              <div className="option">
                <label htmlFor="bt_address">Buy Token Address: </label>
                <input type="text" id="bt_address" onChange={handleInputChange} placeholder="Enter buy token address" />
              </div>
              <div className="option">
                <label htmlFor="rt_price">Reward Token Price: </label>
                <input
                  type="number"
                  id="rt_price"
                  onChange={handleInputChange}
                  placeholder="Enter reward token price"
                />
              </div>
              <div className="option">
                <label htmlFor="softcap">Soft Cap: </label>
                <input type="number" id="softcap" onChange={handleInputChange} placeholder="Enter soft cap" />
              </div>
              <div className="option">
                <label htmlFor="hardcap">Hard Cap: </label>
                <input type="number" id="hardcap" onChange={handleInputChange} placeholder="Enter hard cap" />
              </div>
            </div>
          </div>
          <div className="content-section">
            <h3 className="content-section__title">Step 4: Set timestamps</h3>
            <div className="content-section__options">
              <div className="option">
                <label>Start time: </label>
                <DateTimePicker value={startDateTime} id="startStamp" onChange={handleStartDateChange} />
              </div>
              <div className="option">
                <label>End time: </label>
                <DateTimePicker value={endDateTime} id="endStamp" onChange={handleEndDateChange} />
              </div>
              <div className="option">
                <label>Claim time: </label>
                <DateTimePicker value={claimDateTime} id="claimStamp" onChange={handleClaimDateChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
