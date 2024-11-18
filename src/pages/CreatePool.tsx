import React, { useState } from 'react';
import axios from 'axios';

import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../contracts/IDOFactory';

import '../styles/pages/create-pool.scss';
import '../styles/layouts/app.scss';

import DateTimePicker from '../components/DateTimePicker';
import Button from '../components/Button';
import AvatarUpload from '../components/AvatarUpload';
import ConnectWallet from '../components/ConnectWallet';

const pinataApiKey = 'f3ac091f5be20e1120f2';
const pinataSecretApiKey = '8407ead4bb4fef8118b23f3f53070bc1d967db62a0e2d321c4f952c8df8fc341';

export default function CreatePool() {
  const [file, setFile] = useState<File | null>(null);
  const [ipfsUrl, setIpfsUrl] = useState<string | null>(null);

  const [dateTime, setDateTime] = useState<Date | null>(new Date());

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
    // upload avatar to IPFS
    await handleUploadToIPFS();

    // call createIDO function in IDOFactory contract
    // contract : 0x60e0BbC21e05Fd3Cc275E0e5d273Cb0b8A9e4950, owner : 0xa6fed877eB8845A24B361A2C3b80F3D528f91d42
    const idoFactory = await getContract();
    if (idoFactory) {
      await idoFactory.createIDO(
        {
          feeName: 'TestFee',
          feeSymbol: 'TEST',
          feeSupply: ethers.parseEther('1000'),
        },
        {
          rewardToken: '0x7cb8e2bfa6cb7c7ec1d6d8f8d3e7b7d5f5b9f9d1',
          rewardTokenPrice: ethers.parseEther('2'),
          buyToken: '0x7cb8e2bfa6cb7c7ec1d6d8f8d3e7b7d5f5b9f9d1',
          buyTokenSupply: 0,
          softCap: ethers.parseEther('300'),
          hardCap: ethers.parseEther('500'),
        },
        {
          startTimestamp: Date.now() / 1000 + 3600,
          endTimestamp: Date.now() / 1000 + 7200,
          claimTimestamp: Date.now() / 1000 + 10800,
        },
        {
          router: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6', // do not use this
          factory: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6', // do not use this
        },
        ipfsUrl
      );
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
      const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
      setIpfsUrl(ipfsUrl);
      console.log('Uploaded to Pinata:', ipfsUrl);
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
    }
  };

  const handleDateChange = (date: Date | null) => {
    setDateTime(date);
  };

  return (
    <div className="container">
      <div className="create-pool">
        <div className="create-pool__header">
          <h2 className="header-title">Create Pool</h2>
          <ConnectWallet />
          <Button label="Create IDO" onClick={handleClick} variant="primary"></Button>
        </div>
        <div className="create-pool__content">
          <div className="content-section">
            <h3 className="content-section__title">Step 1: Upload reward token avatar via IPFS</h3>
            <div className="content-section__options">
              <div className="option">
                <div>
                  <AvatarUpload onUpload={handleFileUpload} />
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
