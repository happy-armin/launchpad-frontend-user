import React, { useEffect, useState } from 'react';
import IDOCard from '../components/IDOCard';
import { gql, useQuery } from '@apollo/client';

import '../styles/pages/ido-view.scss';
import { ClaimablePools, ComingPools, EndedPools, OpenPools, PoolItem } from '../contracts/filter-pool';
import getTokenInfo, { TokenInfo } from '../contracts/ERC20';
import { PoolProgressInfo } from '../types/types';
import { getPoolContract } from '../contracts/IDOPool';
import { Contract } from 'ethers';

const GET_POOLS = gql`
  query GetPools {
    pools {
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

export default function IDOView() {
  const { loading, error, data } = useQuery(GET_POOLS);

  const [tokenInfo, setTokenInfo] = useState<Array<TokenInfo> | null>(null);
  const [bTokenInfo, setBTokenInfo] = useState<Array<TokenInfo> | null>(null);
  const [progressInfo, setProgressInfo] = useState<Array<PoolProgressInfo> | null>(null);

  const [fullLoading, setFullLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!!data) {
      getData();
    }
  }, [data]);

  const getData = async () => {
    const poolItems = data.pools.map((pool: PoolItem) => ({
      id: pool.id,
      address: pool.address,
      rewardToken: pool.rewardToken,
      price: pool.price,
      buyToken: pool.buyToken,
      softCap: pool.softCap,
      hardCap: pool.hardCap,
      startTime: pool.startTime,
      endTime: pool.endTime,
      claimTime: pool.claimTime,
      ipfsUrl: pool.ipfsUrl,
    }));

    let rewardTokenInfo = [] as Array<TokenInfo>;
    let buyTokenInfo = [] as Array<TokenInfo>;
    let progInfo = [] as Array<PoolProgressInfo>;

    const tokenInfoPromise = poolItems.map(async (pool: PoolItem) => {
      // get token info from address in the pool
      const rinfo: TokenInfo = await getTokenInfo(pool.rewardToken);
      const binfo: TokenInfo = await getTokenInfo(pool.buyToken);
      rewardTokenInfo.push(rinfo);
      buyTokenInfo.push(binfo);

      // get pool progress info from address in the pool
      const poolContract: Contract | undefined = await getPoolContract(pool.address);
      if (poolContract !== undefined) {
        const stakedAmount = await poolContract.getTotalStakedAmount();
        const progress = Number((BigInt(stakedAmount) * BigInt(100)) / BigInt(pool.hardCap));
        progInfo.push({ id: pool.id, progress: progress });
      }
    });

    await Promise.all(tokenInfoPromise);

    setTokenInfo(rewardTokenInfo);
    setBTokenInfo(buyTokenInfo);
    setProgressInfo(progInfo);
  };

  useEffect(() => {
    if (!!tokenInfo && !!bTokenInfo && !!progressInfo) {
      setFullLoading(true);

      console.log(progressInfo);
    }
  }, [tokenInfo, bTokenInfo, progressInfo]);

  return (
    <div className="ido-container">
      {(loading || error) && (
        <div className="message">
          {loading && <p className="loading">Loading ...</p>}
          {error && <p className="error">{error.message}</p>}
        </div>
      )}
      {!!data && !!fullLoading && (
        <div className="ido-content">
          <div className="ido-section">
            <div className="section-header">
              <h2>PROJECTS OPEN NOW</h2>
            </div>
            <div className="section-content">
              {OpenPools(data.pools).map((pool: PoolItem, index: number) => (
                <IDOCard
                  key={index}
                  poolId={pool.id}
                  tokenName={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.name}
                  tokenSymbol={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.symbol}
                  ipfsUrl={pool.ipfsUrl}
                  buyToken={bTokenInfo?.find((tokenInfo) => tokenInfo.address === pool.buyToken)?.name}
                  poolState={'Live'}
                  swapRate={pool.price}
                  tokenCap={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.supply}
                  softCap={pool.softCap}
                  hardCap={pool.hardCap}
                  progress={progressInfo?.find((info) => info.id === pool.id)?.progress}
                />
              ))}
            </div>
          </div>
          <div className="ido-section">
            <div className="section-header">
              <h2>PROJECTS CLAIMABLE</h2>
            </div>
            <div className="section-content">
              {ClaimablePools(data.pools).map((pool: PoolItem, index: number) => (
                <IDOCard
                  key={index}
                  poolId={pool.id}
                  tokenName={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.name}
                  tokenSymbol={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.symbol}
                  ipfsUrl={pool.ipfsUrl}
                  buyToken={bTokenInfo?.find((tokenInfo) => tokenInfo.address === pool.buyToken)?.symbol}
                  poolState={'Claimable'}
                  swapRate={pool.price}
                  tokenCap={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.supply}
                  softCap={pool.softCap}
                  hardCap={pool.hardCap}
                  progress={progressInfo?.find((info) => info.id === pool.id)?.progress}
                />
              ))}
            </div>
          </div>
          <div className="ido-section">
            <div className="section-header">
              <h2>PROJECTS COMING SOON</h2>
            </div>
            <div className="section-content">
              {ComingPools(data.pools).map((pool: PoolItem, index: number) => (
                <IDOCard
                  key={index}
                  poolId={pool.id}
                  tokenName={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.name}
                  tokenSymbol={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.symbol}
                  ipfsUrl={pool.ipfsUrl}
                  buyToken={bTokenInfo?.find((tokenInfo) => tokenInfo.address === pool.buyToken)?.name}
                  poolState={'Upcoming'}
                  swapRate={pool.price}
                  tokenCap={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.supply}
                  softCap={pool.softCap}
                  hardCap={pool.hardCap}
                  progress={progressInfo?.find((info) => info.id === pool.id)?.progress}
                />
              ))}
            </div>
          </div>
          <div className="ido-section">
            <div className="section-header">
              <h2>PROJECTS CLOSED</h2>
            </div>
            <div className="section-content">
              {EndedPools(data.pools).map((pool: PoolItem, index: number) => (
                <IDOCard
                  key={index}
                  poolId={pool.id}
                  tokenName={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.name}
                  tokenSymbol={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.symbol}
                  ipfsUrl={pool.ipfsUrl}
                  buyToken={bTokenInfo?.find((tokenInfo) => tokenInfo.address === pool.buyToken)?.name}
                  poolState={'Closed'}
                  swapRate={pool.price}
                  tokenCap={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.supply}
                  softCap={pool.softCap}
                  hardCap={pool.hardCap}
                  progress={progressInfo?.find((info) => info.id === pool.id)?.progress}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
