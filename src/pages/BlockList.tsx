import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../contracts/IDOFactory';
import Button from '../components/Button';
import Filter_Block from '../contracts/filter-block';

import '../styles/pages/block-list.scss';

const GET_BLOCKED_USERS = gql`
  query GetBlockedUsers {
    addedToBlocks {
      id
      account
    }
    removedFromBlocks {
      id
      account
    }
  }
`;

export default function BlockList() {
  const { loading, error, data } = useQuery(GET_BLOCKED_USERS);
  const [blockAddress, setBlockAddress] = useState<string>('');

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

  const handleAddClick = async () => {
    const idoFactory = await getContract();
    if (idoFactory) {
      await idoFactory.addToBlock(blockAddress);
    }
  };

  const handleRemoveClick = async (blockAddress: string) => {
    const idoFactory = await getContract();
    if (idoFactory) {
      await idoFactory.removeFromBlock(blockAddress);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBlockAddress(event.target.value);
  };

  return (
    <div className="container">
      {(loading || error) && (
        <div className="message">
          {loading && <p className="loading">Loading ...</p>}
          {error && <p className="error">Error : {error.message}</p>}
        </div>
      )}
      {!!data && (
        <div className="block-list">
          <div className="block-list__header">
            <h2 className="header-title">Block List</h2>
            <div>
              <input
                type="text"
                id="block_address"
                onChange={handleChange}
                value={blockAddress}
                placeholder="Enter block user address"
              />
              <Button label="Add account" onClick={handleAddClick} variant="primary"></Button>
            </div>
          </div>
          <div className="block-list__content">
            <ul className="data-list">
              {Filter_Block(data.addedToBlocks, data.removedFromBlocks).map(
                (user: { id: string; account: string }, index: number) => (
                  <li key={index} className={index % 2 === 0 ? 'even' : 'odd'}>
                    <span>{user.account}</span>
                    <button onClick={() => handleRemoveClick(user.account)}>remove</button>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
