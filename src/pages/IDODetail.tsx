import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { PoolItem } from '../contracts/filter-pool';
import IDOInfoCard from '../components/IDOInfoCard';
import getTokenInfo, { TokenInfo } from '../contracts/ERC20';
import IDODetailCard from '../components/IDODetailCard';

import '../styles/pages/ido-detail.scss';
import { Contract } from 'ethers';
import { getPoolContract } from '../contracts/IDOPool';
import { TimeStamps } from '../types/types';
import { time } from 'console';
import ParticipateCard from '../components/ParticipateCard';

const GET_POOL = gql`
  query GetPool($id: ID!) {
    pool(id: $id) {
      id
      holder
      address
      rewardToken
      price
      buyToken
      softCap
      hardCap
      startTime
      endTime
      claimTime
      ipfsUrl
    }
  }
`;

export default function IDODetail() {
  const navigate = useNavigate();
  const poolId = useParams<{ poolId: string }>();
  const [poolInfo, setPoolInfo] = useState<PoolItem | undefined>(undefined);
  const [rewardInfo, setRewardInfo] = useState<TokenInfo | undefined>(undefined);
  const [buyInfo, setBuyInfo] = useState<TokenInfo | undefined>(undefined);
  const [timeInfo, setTimeInfo] = useState<TimeStamps | undefined>(undefined);
  const [poolState, setPoolState] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [progressInfo, setProgressInfo] = useState<number>(0);

  const { loading, error, data } = useQuery<{ pool: PoolItem }>(GET_POOL, { variables: { id: poolId.poolId } });

  const getDateFromStamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date;
  };

  // call pool info getting function when query is successful
  useEffect(() => {
    if (!!data) {
      getPoolInfo();
    }
  }, [data]);

  // get pool information and token information
  const getPoolInfo = async () => {
    const poolItem: PoolItem | undefined = data?.pool;

    if (poolItem === null || poolItem === undefined) {
      navigate('/404');
    } else {
      setPoolInfo(poolItem);

      const rInfo: TokenInfo | undefined = await getTokenInfo(poolItem.rewardToken);
      const bInfo: TokenInfo | undefined = await getTokenInfo(poolItem.buyToken);
      setRewardInfo(rInfo);
      setBuyInfo(bInfo);

      const poolContract: Contract | undefined = await getPoolContract(poolItem.address);
      if (poolContract !== undefined) {
        const timeStamps: TimeStamps = await poolContract.getTimestamps();
        setTimeInfo(timeStamps);

        // calculate pool state
        if (timeStamps.startTimestamp >= Math.floor(Date.now() / 1000)) {
          setPoolState('Upcoming');
        } else if (
          timeStamps.startTimestamp < Math.floor(Date.now() / 1000) &&
          timeStamps.endTimestamp >= Math.floor(Date.now() / 1000)
        ) {
          setPoolState('Live');
        } else if (
          timeStamps.endTimestamp < Math.floor(Date.now() / 1000) &&
          timeStamps.claimTimestamp >= Math.floor(Date.now() / 1000)
        ) {
          setPoolState('Closed');
        } else if (timeStamps.claimTimestamp < Math.floor(Date.now() / 1000)) {
          setPoolState('Claimable');
        }

        // calculate pool progress
        const stakedAmount = await poolContract.getTotalStakedAmount();
        const progress = (BigInt(stakedAmount) * BigInt(100)) / BigInt(poolItem.hardCap ? poolItem.hardCap : 0);
        setProgressInfo(Number(progress));
      }
    }
  };

  const isLoaded = () => {
    return (
      poolInfo !== undefined &&
      rewardInfo !== undefined &&
      buyInfo !== undefined &&
      timeInfo !== undefined &&
      poolState != ''
    );
  };

  // loading condition
  useEffect(() => {
    if (isLoaded()) {
      setIsLoading(false);
    }
  }, [poolInfo, rewardInfo, buyInfo, timeInfo, progressInfo]);

  return (
    <div className="detail-container">
      {!!isLoading && (
        <div className="message">
          <p className="loading">Loading ...</p>
        </div>
      )}
      {!isLoading &&
        poolInfo !== undefined &&
        rewardInfo !== undefined &&
        buyInfo !== undefined &&
        timeInfo != undefined &&
        poolState != '' && (
          <div className="detail-content">
            <div className="detail-card">
              <IDOInfoCard
                poolId={poolInfo.id}
                tokenName={rewardInfo.name}
                tokenSymbol={rewardInfo.symbol}
                ipfsUrl={poolInfo.ipfsUrl}
                buyToken={buyInfo.name}
                poolState={poolState}
                swapRate={poolInfo.price}
                tokenCap={rewardInfo.supply}
                softCap={poolInfo.softCap}
                hardCap={poolInfo.hardCap}
                progress={progressInfo}
              />
            </div>
            <div className="detail-main">
              <div className="detail-info">
                <IDODetailCard
                  poolId={poolInfo.id}
                  owner={poolInfo.holder}
                  address={poolInfo.address ? poolInfo.address : 'Unknow address'}
                  rewardToken={poolInfo.rewardToken}
                  tokenName={rewardInfo.name}
                  tokenSymbol={rewardInfo.symbol}
                  ipfsUrl={poolInfo.ipfsUrl}
                  buyToken={buyInfo}
                  poolState={'Live'}
                  swapRate={poolInfo.price}
                  tokenCap={rewardInfo.supply}
                  softCap={poolInfo.softCap}
                  hardCap={poolInfo.hardCap}
                  startTime={Number(timeInfo.startTimestamp)}
                  endTime={Number(timeInfo.endTimestamp)}
                  claimTime={Number(timeInfo.claimTimestamp)}
                  progress={progressInfo}
                />
              </div>
              <div className="detail-action">
                <ParticipateCard
                  address={poolInfo.address}
                  rewardTokenAddress={poolInfo.rewardToken}
                  buyTokenAddress={poolInfo.buyToken}
                  startTime={getDateFromStamp(Number(timeInfo.startTimestamp))}
                  endTime={getDateFromStamp(Number(timeInfo.endTimestamp))}
                  claimTime={getDateFromStamp(Number(timeInfo.claimTimestamp))}
                  rewardTokenSymbol={rewardInfo.symbol}
                  buyTokenSymbol={buyInfo.symbol}
                  price={poolInfo.price}
                  isSuccessed={(BigInt(progressInfo) * BigInt(poolInfo.hardCap)) / BigInt(100) >= poolInfo.softCap}
                />
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
