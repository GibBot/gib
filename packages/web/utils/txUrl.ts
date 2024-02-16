export const getExplorerUrl = (chainId: number, txId: string) => {
  switch (chainId) {
    case 1:
      return `https://etherscan.io/tx/${txId}`;
    case 5:
      return `https://goerli.etherscan.io/tx/${txId}`;
    case 4:
      return `https://rinkeby.etherscan.io/tx/${txId}`;
    case 56:
      return `https://bscscan.com/tx/${txId}`;
    case 97:
      return `https://testnet.bscscan.com/tx/${txId}`;
    default:
      return '';
  }
};
