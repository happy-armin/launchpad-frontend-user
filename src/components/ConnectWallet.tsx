import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import '../styles/components/connect-wallet.scss';

const ConnectWallet: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        const network = await web3Provider.getNetwork();
        if (network.chainId !== BigInt(11155111)) {
          alert('Please switch to the Sepolia network in MetaMask.');
          return;
        }

        const signer = web3Provider.getSigner();
        const address = (await signer).address;
        setAccount(address);
        setProvider(web3Provider);
        console.log(await provider?.listAccounts());
      } catch (error) {
        console.error('Error connecting to wallet:', error);
      }
    } else {
      console.error('MetaMask is not installed');
    }
  };

  useEffect(() => {
    const checkIfWalletIsConnected = async () => {
      if (window.ethereum) {
        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await web3Provider.listAccounts();
        const network = await web3Provider.getNetwork();

        if (accounts.length > 0 && network.chainId === BigInt(11155111)) {
          setAccount(accounts[0].address);
          setProvider(web3Provider);
        } else if (network.chainId !== BigInt(11155111)) {
          alert('Please switch to the Sepolia network in MetaMask.');
        }
      }
    };

    checkIfWalletIsConnected();
  }, []);

  return (
    <div>
      {account ? (
        <p className="connected-account">{account}</p>
      ) : (
        <button className="connect-button" onClick={connectWallet}>
          Connect MetaMask
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
