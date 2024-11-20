import React from 'react';

import '../styles/components/ido-card.scss';
import { ethers } from 'ethers';

interface CardProps {
  tokenName: string | undefined;
  tokenSymbol: string | undefined;
  ipfsUrl: string;
  buyToken: string | undefined;
  poolState: string;
  swapRate: bigint;
  tokenCap: bigint | undefined;
  softCap: bigint;
  hardCap: bigint;
  progress: number;
}

export default function IDOCard(props: CardProps) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="avatar">
          <img src={props.ipfsUrl}></img>
        </div>
        <div className="head-info">
          <h3 className="token-name">{props.tokenName}</h3>
          <div className="token-symbol">{props.tokenSymbol}</div>
          <div className={`pool-state ${props.poolState}`}>{props.poolState}</div>
        </div>
      </div>
      <div className="card-description">
        <p>
          An Initial DEX Offering (IDO) is an exciting way for new cryptocurrencies to launch and raise funds directly
          from investors on decentralized exchanges!
        </p>
      </div>
      <div className="card-detail">
        <div className="swap-rate">
          <h4>Swap Rate</h4>
          <p>
            1 {props.tokenSymbol} = {ethers.formatEther(props.swapRate?.toString())} {props.buyToken}
          </p>
        </div>
        <div className="token-cap">
          <h4>Cap</h4>
          <p>{props.tokenCap ? Number(ethers.formatEther(props.tokenCap.toString())) : 'N/A'}</p>
        </div>
      </div>
      <div className="card-progress">
        <div className="top-detail">
          <span>Progress</span>
          <span>0%</span>
        </div>
        <div className="progress"></div>
      </div>
    </div>
  );
}
