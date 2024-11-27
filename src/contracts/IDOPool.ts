import { ethers } from 'ethers';

const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'initialOwner',
        type: 'address',
      },
      {
        components: [
          {
            internalType: 'contract IERC20',
            name: 'rewardToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'rewardTokenPrice',
            type: 'uint256',
          },
          {
            internalType: 'contract IERC20',
            name: 'buyToken',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'buyTokenSupply',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'softCap',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'hardCap',
            type: 'uint256',
          },
        ],
        internalType: 'struct IDOPool.TokenInfo',
        name: '_tokenInfo',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'startTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'claimTimestamp',
            type: 'uint256',
          },
        ],
        internalType: 'struct IDOPool.Timestamps',
        name: '_timestamps',
        type: 'tuple',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'router',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'factory',
            type: 'address',
          },
        ],
        internalType: 'struct IDOPool.DEXInfo',
        name: '_dexInfo',
        type: 'tuple',
      },
      {
        internalType: 'string',
        name: '_metadataUrl',
        type: 'string',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address',
      },
    ],
    name: 'SafeERC20FailedOperation',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'holder',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'pool',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'rewardToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'buyToken',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'softCap',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'hardCap',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'startTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'endTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'claimTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'ipfsUrl',
        type: 'string',
      },
    ],
    name: 'PoolCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'holder',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'pool',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'TokenClaim',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'holder',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'pool',
        type: 'address',
      },
    ],
    name: 'TokenRefund',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'holder',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'pool',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'TokenStake',
    type: 'event',
  },
  {
    inputs: [],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'dexInfo',
    outputs: [
      {
        internalType: 'address',
        name: 'router',
        type: 'address',
      },
      {
        internalType: 'address',
        name: 'factory',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'distributed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTimestamps',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'startTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'claimTimestamp',
            type: 'uint256',
          },
        ],
        internalType: 'struct IDOPool.Timestamps',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTotalStakedAmount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'metadataUrl',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'refund',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_hardCap',
        type: 'uint256',
      },
    ],
    name: 'setHardCap',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_softCap',
        type: 'uint256',
      },
    ],
    name: 'setSoftCap',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'timestamps',
    outputs: [
      {
        internalType: 'uint256',
        name: 'startTimestamp',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'endTimestamp',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'claimTimestamp',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tokenInfo',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: 'rewardToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'rewardTokenPrice',
        type: 'uint256',
      },
      {
        internalType: 'contract IERC20',
        name: 'buyToken',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'buyTokenSupply',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'softCap',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'hardCap',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'startTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTimestamp',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'claimTimestamp',
            type: 'uint256',
          },
        ],
        internalType: 'struct IDOPool.Timestamps',
        name: '_timestamp',
        type: 'tuple',
      },
    ],
    name: 'updateTimestamps',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'userInfo',
    outputs: [
      {
        internalType: 'uint256',
        name: 'stakedAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'claimedAmount',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: 'hasClaimed',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const getPoolContract = async (contractAddress: string) => {
  if (window.ethereum) {
    try {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);

      const signer = await web3Provider.getSigner();

      // Initialize the contract with signer
      const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, signer);

      return contract;
    } catch (error) {
      console.log(error);
    }
  }
};
