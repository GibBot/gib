import { ERC20__factory } from '@bot/contracts';
import Moralis from 'moralis';
import prisma from '../prisma';
import { getProvider } from './provider';

Moralis.start({
  apiKey:
    'JtlovHTJTu5hw7YhbUUXVFM8GCQO3Jn9H4tt34NKyUVPqXJ1F5K4MU5tqprQ5k3L',
}).catch(() => {});

const defaultBlock = 10493597;
export const watchedTargetWallet =
  '0xeBd34d5E46Bb65B7D4dCaAa1CC682366425d68Fb';
const watchedToken = '0x23A7cdfda91E96048C99750F51E996C4FE195983';

export const mockToken = watchedToken;
export const checkBlockTxns = async (chainId: number) => {
  const contract = ERC20__factory.connect(
    watchedToken,
    getProvider(chainId),
  );
  const filter = contract.filters.Transfer(null, watchedTargetWallet);

  const startBlock = await getLastCheckedBlock();

  const latestBlock = await contract.provider.getBlockNumber();

  if (startBlock >= latestBlock) {
    console.log('No new block to check');
    return {
      txns: [],
      startBlock,
      skip: true,
    };
  }

  const events = await contract.queryFilter(
    filter,
    startBlock,
    startBlock + 3,
  );

  // contract.on(filter, (from, to, amount, event) => {
  //   console.log(
  //     '🚀 ~ checkBlockTxns ~ from, to, amount',
  //     from,
  //     to,
  //     amount,
  //     event.transactionHash,
  //   );
  // });

  const txns = events.map(event => {
    return {
      wallet: event.args.from,
      amount: event.args.value,
      token: watchedToken,
      txId: event.transactionHash,
      chainId,
    };
  });

  return {
    txns,
    startBlock,
  };
};

const getLastCheckedBlock = async () => {
  const lastBlock = await prisma.blockCheck.findFirst({
    orderBy: { blockHeight: 'desc' },
  });

  if (!lastBlock) {
    return defaultBlock;
  }

  return lastBlock.blockHeight + 1;
};
