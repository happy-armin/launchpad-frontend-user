import { ethers } from 'ethers';

// ERC20 ABI to fetch the name and symbol
const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function totalSupply() view returns (uint256)',
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

export default getTokenInfo;
