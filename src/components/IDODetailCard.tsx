import React from 'react';
import { ethers } from 'ethers';

import '../styles/components/ido-detail-card.scss';
import { TokenInfo } from '../contracts/ERC20';

interface CardProps {
  poolId: string;
  address: string;
  owner: string;
  rewardToken: string;
  tokenName: string | undefined;
  tokenSymbol: string | undefined;
  ipfsUrl: string;
  buyToken: TokenInfo | undefined;
  poolState: string;
  swapRate: bigint;
  tokenCap: bigint | undefined;
  softCap: bigint;
  hardCap: bigint;
  progress: number;
  startTime: number;
  endTime: number;
  claimTime: number;
}

export default function IDODetailCard(props: CardProps) {
  const getLocalTime = (seconds: number): string => {
    const date = new Date(seconds * 1000);
    return date.toLocaleString();
  };

  return (
    <div className="card-detail-content">
      <div className="card-header">
        <h3 className="header-caption">Pool details</h3>
      </div>
      <div className="card-content">
        <div className="content-detail">
          <div className="detail-item title">Pool Address</div>
          <div className="detail-item value">{props.address}</div>
        </div>
        <div className="content-detail">
          <div className="detail-item title">Pool Owner</div>
          <div className="detail-item value">{props.owner}</div>
        </div>
        <span className="divider"></span>
        <div className="content-detail">
          <div className="detail-item title">Reward Token Address</div>
          <div className="detail-item value">{props.rewardToken}</div>
        </div>
        <div className="content-detail">
          <div className="detail-item title">Reward Token Name</div>
          <div className="detail-item value">{props.tokenName}</div>
        </div>
        <div className="content-detail">
          <div className="detail-item title">Reward Token Symbol</div>
          <div className="detail-item value">{props.tokenSymbol}</div>
        </div>
        <div className="content-detail">
          <div className="detail-item title">Reward Token Cap</div>
          <div className="detail-item value">
            {props.tokenCap ? Number(ethers.formatEther(props.tokenCap.toString())) : 'N/A'}
          </div>
        </div>
        <span className="divider"></span>
        <div className="content-detail">
          <div className="detail-item title">Buy Token Address</div>
          <div className="detail-item value">{props.buyToken?.address}</div>
        </div>
        <div className="content-detail">
          <div className="detail-item title">Buy Token Name</div>
          <div className="detail-item value">{props.buyToken?.name}</div>
        </div>
        <div className="content-detail">
          <div className="detail-item title">Buy Token Symbol</div>
          <div className="detail-item value">{props.buyToken?.symbol}</div>
        </div>
        <span className="divider"></span>
        <div className="content-detail">
          <div className="detail-item title">Soft Cap</div>
          <div className="detail-item value">
            {props.softCap ? Number(ethers.formatEther(props.softCap.toString())) : 'N/A'}
          </div>
        </div>
        <div className="content-detail">
          <div className="detail-item title">Hard Cap</div>
          <div className="detail-item value">
            {props.hardCap ? Number(ethers.formatEther(props.hardCap.toString())) : 'N/A'}
          </div>
        </div>
        <span className="divider"></span>
        <div className="content-detail">
          <div className="detail-item title">Start TimeStamp</div>
          <div className="detail-item value">{getLocalTime(props.startTime)}</div>
        </div>
        <div className="content-detail">
          <div className="detail-item title">End TimeStamp</div>
          <div className="detail-item value">{getLocalTime(props.endTime)}</div>
        </div>
        <div className="content-detail">
          <div className="detail-item title">Claim TimeStamp</div>
          <div className="detail-item value">{getLocalTime(props.claimTime)}</div>
        </div>
      </div>
    </div>
  );
}
