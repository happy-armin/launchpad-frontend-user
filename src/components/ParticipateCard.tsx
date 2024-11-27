import React, { useEffect, useState } from 'react';
import { Contract, ethers } from 'ethers';
import { getPoolContract } from '../contracts/IDOPool';
import { TimeStamps } from '../types/types';
import ERC20, { getERC20Token } from '../contracts/ERC20';
import { useWallet } from './WalletProvider';

import '../styles/components/participate-card.scss';

interface ParticipateCardProps {
  address: string; // pool contract address
  rewardTokenAddress: string; // reward token contract address
  buyTokenAddress: string; // buy token contract address
  startTime: Date;
  endTime: Date;
  claimTime: Date;
  rewardTokenSymbol: string; // reward token symbol
  buyTokenSymbol: string; // buy token symbol
  price: bigint;
  isSuccessed: boolean;
}

export default function ParticipateCard(props: ParticipateCardProps) {
  const [buyToken, setBuyToken] = useState<Contract | undefined>(undefined);
  const [rewardToken, setRewardToken] = useState<Contract | undefined>(undefined);
  const [buyTokenBalance, setBuyTokenBalance] = useState<bigint | 0>(0);
  const [rewardTokenBalance, setRewardTokenBalance] = useState<bigint | 0>(0);
  const [userState, setUserState] = useState<number>(0);
  const [stakedAmount, setStakedAmount] = useState<bigint | 0>(0);
  const [claimable, setClaimableAmount] = useState<bigint | 0>(0);
  const [stakeValue, setStakeValue] = useState<number>(0);

  const { walletAddress } = useWallet();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === 'stake') {
      setStakeValue(Number(event.target.value));
    }
  };

  // stake action handling
  const handleClickStake = async () => {
    const poolContract = await getPoolContract(props.address);
    if (!!poolContract && !!buyToken) {
      const tx1 = await buyToken.approve(props.address, ethers.parseEther(stakeValue.toString()));
      await tx1.wait();

      const tx2 = await poolContract.stake(ethers.parseEther(stakeValue.toString())).catch((error) => {
        alert('Error staking:' + error.message);
      });
      await tx2.wait();

      alert('Successfully staked');
      setStakeValue(0);
      setBuyTokenBalance(BigInt(buyTokenBalance) + BigInt(1));
    }
  };

  // refund action handling
  const handleClickRefund = async () => {
    if (!!props.isSuccessed) {
      alert('Cannot refund because the pool is successed');
      return;
    }

    const poolContract = await getPoolContract(props.address);
    if (!!poolContract && !!buyToken) {
      const tx = await poolContract.userInfo(walletAddress);
      const stkAmount: bigint = tx[0];
      const clmAmount: bigint = tx[1];
      const hasClaimd: boolean = tx[2];

      if (stkAmount !== BigInt(0) && !hasClaimd) {
        const tx1 = await buyToken.approve(props.address, stkAmount);
        await tx1.wait();

        const tx2 = await poolContract.refund().catch((error) => {
          alert('Error refunding:' + error.message);
        });
        await tx2.wait();

        alert('Successfully refunded');
        setBuyTokenBalance(BigInt(buyTokenBalance) + BigInt(stakeValue));
      } else {
        alert('You staked zero');
      }
    }
  };

  const handleClickClaim = async () => {
    if (!props.isSuccessed) {
      alert('Cannot claim because the pool is not successed');
      return;
    }

    const poolContract = await getPoolContract(props.address);
    if (!!poolContract && !!rewardToken) {
      const tx = await poolContract.userInfo(walletAddress);
      const stkAmount: bigint = tx[0];
      const clmAmount: bigint = tx[1];
      const hasClaimd: boolean = tx[2];

      if (stkAmount !== BigInt(0) && !hasClaimd) {
        const tx1 = await rewardToken.approve(props.address, (BigInt(stkAmount) * BigInt(1e18)) / props.price);
        await tx1.wait();

        const tx2 = await poolContract.claim().catch((error) => {
          alert('Error claiming:' + error.message);
        });
        await tx2.wait();

        alert('Successfully claimed!');
      } else {
        alert('You staked zero');
      }
    }
  };

  // get reward token contract
  const getRewardToken = async () => {
    const _rewardToken = await getERC20Token(props.rewardTokenAddress);
    setRewardToken(_rewardToken);
  };

  // get buy token contract
  const getBuyToken = async () => {
    const _buyToken = await getERC20Token(props.buyTokenAddress);
    setBuyToken(_buyToken);
  };

  // get reward token balance
  const getRewardTokenBalance = async () => {
    if (rewardToken) {
      const balance = await rewardToken.balanceOf(walletAddress);
      setRewardTokenBalance(balance);
    }
  };
  // get buy token balance
  const getBuyTokenBalance = async () => {
    if (buyToken) {
      const balance = await buyToken.balanceOf(walletAddress);
      setBuyTokenBalance(balance);
    }
  };

  const getStackedAmount = async () => {
    if (rewardToken && buyToken) {
      const poolContract = await getPoolContract(props.address);
      if (!!poolContract) {
        const tx = await poolContract.userInfo(walletAddress);
        const stkAmount: bigint = tx[0];
        setStakedAmount(stkAmount);
        return stkAmount;
      }
      return BigInt(0);
    }
    return BigInt(0);
  };

  const getClaimableAmount = async () => {
    if (rewardToken && buyToken) {
      const poolContract = await getPoolContract(props.address);
      if (!!poolContract) {
        const tx = await poolContract.userInfo(walletAddress);
        const stkAmount: bigint = tx[0];
        setClaimableAmount((BigInt(stkAmount) * BigInt(1e18)) / BigInt(props.price));
      }
    }
  };

  useEffect(() => {
    if (rewardToken === undefined) {
      getRewardToken();
    } else {
      getRewardTokenBalance();
    }

    if (buyToken === undefined) {
      getBuyToken();
    } else {
      getBuyTokenBalance();
    }

    getStackedAmount();
    getClaimableAmount();
  }, [rewardToken, buyToken, stakedAmount, claimable]);

  return (
    <div className="participate-card">
      <div className="card-header">
        <h3>Participate In</h3>
      </div>
      <div className="card-content">
        <div className="content-item">
          <label className="title">Stake</label>
          <label className="info">
            You have '{ethers.formatEther(buyTokenBalance)}' {props.buyTokenSymbol}.
          </label>
          <input
            type="number"
            className="input"
            id="stake"
            onChange={handleInputChange}
            placeholder="Enter stake amount"
          ></input>
          <button onClick={handleClickStake}>Confirm</button>
        </div>
        <span className="divider"></span>
        <div className="content-item">
          <label className="title">Refund</label>
          <label className={`info ${props.isSuccessed ? 'success' : 'fail'}`}>
            You staked {ethers.formatEther(stakedAmount)} {props.buyTokenSymbol}.{' '}
            {props.isSuccessed ? "Project successed. Can't refund" : 'Project failed. Can refund.'}
          </label>
          <button onClick={handleClickRefund}>Confirm</button>
        </div>
        <span className="divider"></span>
        <div className="content-item">
          <label className="title">Claim</label>
          <label className={`info ${props.isSuccessed ? 'success' : 'fail'}`}>
            You can claim {ethers.formatEther(claimable)} {props.rewardTokenSymbol}.{' '}
            {props.isSuccessed ? 'Project successed. Can claim' : "Project failed. Can't claim."}
          </label>
          <button onClick={handleClickClaim}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
