import { ethers } from 'ethers';

// ERC20 ABI to fetch the name and symbol
const ERC20_ABI = [
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: 'success', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: 'success', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ name: '_value', type: 'uint256' }],
    name: 'burn',
    outputs: [{ name: 'success', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ name: '', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_from', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'burnFrom',
    outputs: [{ name: 'success', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_spender', type: 'address' },
      { name: '_value', type: 'uint256' },
      { name: '_extraData', type: 'bytes' },
    ],
    name: 'approveAndCall',
    outputs: [{ name: 'success', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { name: '', type: 'address' },
      { name: '', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { name: 'initialSupply', type: 'uint256' },
      { name: 'tokenName', type: 'string' },
      { name: 'tokenSymbol', type: 'string' },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'from', type: 'address' },
      { indexed: true, name: 'to', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'from', type: 'address' },
      { indexed: false, name: 'value', type: 'uint256' },
    ],
    name: 'Burn',
    type: 'event',
  },
];

export interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  supply: bigint;
}

async function getTokenInfo(tokenAddress: string): Promise<TokenInfo> {
  if (window.ethereum) {
    try {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);

      const contract = new ethers.Contract(tokenAddress, ERC20_ABI, web3Provider);

      const [address, name, symbol, supply] = await Promise.all([
        tokenAddress,
        contract.name(),
        contract.symbol(),
        contract.totalSupply(),
      ]);
      return { address, name, symbol, supply };
    } catch (error) {
      console.log('Error occured getting contract : ', error);
      return { address: 'Unknown Address', name: 'Unknown Token', symbol: 'Unknown Symbol', supply: BigInt(0) };
    }
  } else {
    throw new Error('No Ethereum provider found');
  }
}

export const getERC20Token = async (contractAddress: string) => {
  if (window.ethereum) {
    try {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);

      const signer = await web3Provider.getSigner();

      // Initialize the contract with signer
      const contract = new ethers.Contract(contractAddress, ERC20_ABI, signer);

      return contract;
    } catch (error) {
      console.log(error);
    }
  }
};

export default getTokenInfo;
