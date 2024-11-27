export const CONTRACT_ABI = [
  {
    inputs: [{ internalType: 'address', name: 'initialOwner', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  { inputs: [{ internalType: 'address', name: 'owner', type: 'address' }], name: 'OwnableInvalidOwner', type: 'error' },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
      { indexed: false, internalType: 'address', name: 'idoPool', type: 'address' },
      { indexed: false, internalType: 'address', name: 'rewardToken', type: 'address' },
    ],
    name: 'IDOCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }],
    name: 'addedToBlock',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'address', name: 'account', type: 'address' }],
    name: 'removedFromBlock',
    type: 'event',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'addToBlock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'string', name: 'feeName', type: 'string' },
          { internalType: 'string', name: 'feeSymbol', type: 'string' },
          { internalType: 'uint256', name: 'feeSupply', type: 'uint256' },
        ],
        internalType: 'struct IDOFactory.FeeInfo',
        name: 'feeInfo',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'contract IERC20', name: 'rewardToken', type: 'address' },
          { internalType: 'uint256', name: 'rewardTokenPrice', type: 'uint256' },
          { internalType: 'contract IERC20', name: 'buyToken', type: 'address' },
          { internalType: 'uint256', name: 'buyTokenSupply', type: 'uint256' },
          { internalType: 'uint256', name: 'softCap', type: 'uint256' },
          { internalType: 'uint256', name: 'hardCap', type: 'uint256' },
        ],
        internalType: 'struct IDOPool.TokenInfo',
        name: 'tokenInfo',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'uint256', name: 'startTimestamp', type: 'uint256' },
          { internalType: 'uint256', name: 'endTimestamp', type: 'uint256' },
          { internalType: 'uint256', name: 'claimTimestamp', type: 'uint256' },
        ],
        internalType: 'struct IDOPool.Timestamps',
        name: 'timestamp',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'address', name: 'router', type: 'address' },
          { internalType: 'address', name: 'factory', type: 'address' },
        ],
        internalType: 'struct IDOPool.DEXInfo',
        name: 'dexInfo',
        type: 'tuple',
      },
      { internalType: 'string', name: 'metadataUrl', type: 'string' },
    ],
    name: 'createIDO',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'removeFromBlock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

export const CONTRACT_ADDRESS = '0x350a1eE41518804916f3E9D58Dc55F659971F686';
