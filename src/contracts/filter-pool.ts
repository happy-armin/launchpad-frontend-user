export interface PoolItem {
  id: string;
  holder: string;
  address: string;
  rewardToken: string;
  price: bigint;
  buyToken: string;
  softCap: bigint;
  hardCap: bigint;
  startTime: number;
  endTime: number;
  claimTime: number;
  ipfsUrl: string;
}

export const ComingPools = function (pools: PoolItem[]) {
  const comingPools = pools.filter((pool) => pool.startTime > Math.floor(Date.now() / 1000));
  return comingPools.sort((a, b) => a.startTime - b.startTime);
};

export const OpenPools = function (pools: PoolItem[]) {
  const comingPools = pools.filter((pool) => {
    return pool.startTime <= Math.floor(Date.now() / 1000) && pool.endTime > Math.floor(Date.now() / 1000);
  });
  return comingPools.sort((a, b) => a.endTime - b.endTime);
};

export const EndedPools = function (pools: PoolItem[]) {
  const comingPools = pools.filter((pool) => {
    return pool.endTime <= Math.floor(Date.now() / 1000) && pool.claimTime > Math.floor(Date.now() / 1000);
  });
  return comingPools.sort((a, b) => a.claimTime - b.claimTime);
};

export const ClaimablePools = function (pools: PoolItem[]) {
  const comingPools = pools.filter((pool) => pool.claimTime <= Math.floor(Date.now() / 1000));
  return comingPools;
};
