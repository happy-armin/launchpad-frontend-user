export interface FeeInfo {
  feeName: string;
  feeSymbol: string;
  feeSupply: bigint;
}

export interface TokenInfo {
  rewardToken: string;
  rewardTokenPrice: bigint;
  buyToken: string;
  buyTokenSupply: bigint;
  softCap: bigint;
  hardCap: bigint;
}

export interface TimeStamps {
  startTimestamp: bigint;
  endTimestamp: bigint;
  claimTimestamp: bigint;
}

export interface DEXInfo {
  router: string;
  factory: string;
}

export interface PoolProgressInfo {
  id: string;
  progress: number;
}
