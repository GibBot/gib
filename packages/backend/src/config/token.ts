import { ethers } from 'ethers';

export const getTokenInfo = (chainId: number, address: string) => {
  return {
    chain: {
      name: configMap[chainId].name,
      icon: configMap[chainId].icon,
    },
    ...configMap[chainId].token[address],
  };
};

const configMap: Record<
  number,
  {
    name: string;
    icon: string;
    token: Record<
      string,
      { name: string; symbol: string; icon: string; decimals: number }
    >;
  }
> = {
  1: {
    name: 'Blast',
    icon: 'https://www.ethereum.org/images/logos/ETHEREUM-ICON_Black.png',
    token: {
      '0x6b175474e89094c44da98b954eedeac495271d0f': {
        name: 'Dai Stablecoin',
        symbol: 'USDT',
        icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2308.png',
        decimals: 18,
      },
    },
  },
  5: {
    name: 'Blast',
    icon: 'https://www.goerli.net/assets/goerli-logo.svg',
    token: {
      // 部署的测试 token
      '0x23A7cdfda91E96048C99750F51E996C4FE195983': {
        name: 'Tether USD',
        symbol: 'USDT',
        icon: '/images/ethereum.svg',
        decimals: 18,
      },
      [ethers.constants.AddressZero]: {
        name: 'Ether',
        symbol: 'ETH',
        icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
        decimals: 18,
      },
    },
  },
};
