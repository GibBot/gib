import { providers } from 'ethers';

export const getProvider = (chainId: number) => {
  return new providers.JsonRpcProvider(getRPC(chainId));
};

const getRPC = (chainId: number) => {
  // if (network === 'local') {
  //   return 'http://localhost:8545';
  // }

  if (chainId === 5) {
    return 'https://rpc.ankr.com/eth_goerli';
  }

  if (chainId === 1) {
    return 'https://rpc.ankr.com/eth';
  }

  return '';
};
