import React, { useEffect, useState } from 'react';
import IDOCard from '../components/IDOCard';
import { gql, useQuery } from '@apollo/client';

import '../styles/pages/ido-view.scss';
import { ClaimablePools, ComingPools, EndedPools, OpenPools, PoolItem } from '../contracts/filter-pool';
import getTokenInfo, { TokenInfo } from '../contracts/tokenService';

const GET_POOLS = gql`
  query GetPools {
    pools {
      id
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

  const [fullLoading, setFullLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!!data) {
      getData();
    }
  }, [data]);

  const getData = async () => {
    const poolItems = data.pools.map((pool: PoolItem) => ({
      id: pool.id,
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

    const tokenInfoPromise = poolItems.map(async (pool: PoolItem) => {
      const rinfo: TokenInfo = await getTokenInfo(pool.rewardToken);
      const binfo: TokenInfo = await getTokenInfo(pool.buyToken);
      rewardTokenInfo.push(rinfo);
      buyTokenInfo.push(binfo);
    });

    await Promise.all(tokenInfoPromise);

    setTokenInfo(rewardTokenInfo);
    setBTokenInfo(buyTokenInfo);
  };

  useEffect(() => {
    if (!!tokenInfo && !!bTokenInfo) {
      setFullLoading(true);
    }
  }, [tokenInfo, bTokenInfo]);

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
                  tokenName={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.name}
                  tokenSymbol={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.symbol}
                  ipfsUrl={pool.ipfsUrl}
                  buyToken={bTokenInfo?.find((tokenInfo) => tokenInfo.address === pool.buyToken)?.name}
                  poolState={'Live'}
                  swapRate={pool.price}
                  tokenCap={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.supply}
                  softCap={pool.softCap}
                  hardCap={pool.hardCap}
                  progress={0}
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
                  tokenName={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.name}
                  tokenSymbol={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.symbol}
                  ipfsUrl={pool.ipfsUrl}
                  buyToken={bTokenInfo?.find((tokenInfo) => tokenInfo.address === pool.buyToken)?.symbol}
                  poolState={'Claimable'}
                  swapRate={pool.price}
                  tokenCap={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.supply}
                  softCap={pool.softCap}
                  hardCap={pool.hardCap}
                  progress={0}
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
                  tokenName={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.name}
                  tokenSymbol={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.symbol}
                  ipfsUrl={pool.ipfsUrl}
                  buyToken={bTokenInfo?.find((tokenInfo) => tokenInfo.address === pool.buyToken)?.name}
                  poolState={'Upcoming'}
                  swapRate={pool.price}
                  tokenCap={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.supply}
                  softCap={pool.softCap}
                  hardCap={pool.hardCap}
                  progress={0}
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
                  tokenName={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.name}
                  tokenSymbol={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.symbol}
                  ipfsUrl={pool.ipfsUrl}
                  buyToken={bTokenInfo?.find((tokenInfo) => tokenInfo.address === pool.buyToken)?.name}
                  poolState={'Closed'}
                  swapRate={pool.price}
                  tokenCap={tokenInfo?.find((tokenInfo) => tokenInfo.address === pool.rewardToken)?.supply}
                  softCap={pool.softCap}
                  hardCap={pool.hardCap}
                  progress={0}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
