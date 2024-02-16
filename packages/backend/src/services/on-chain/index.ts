import { ethers } from 'ethers';
import { getTokenInfo } from '../../config/token';
import { bot } from '../../tg-bot/core';
import prisma from '../prisma';
import { checkBlockTxns } from './transaction';

export const checkDeposits = async () => {
  const chainId = 5;

  const { txns, startBlock, skip } = await checkBlockTxns(chainId);

  const getUser = async (fromWallet: string) => {
    const user = await prisma.user.findFirst({
      where: { wallet: fromWallet },
    });

    if (!user) return null;

    return user;
  };

  await Promise.all(
    txns.map(async txn => {
      const user = await getUser(txn.wallet);
      if (!user) return;

      if (
        await prisma.transaction.findFirst({ where: { txId: txn.txId } })
      ) {
        return;
      }

      await prisma.transaction.create({
        data: {
          amount: txn.amount.toString(),
          token: txn.token,
          wallet: txn.wallet,
          type: 'DEPOSIT',
          txId: txn.txId,
          chainId: txn.chainId,
          userId: user.id,
        },
      });

      const token = getTokenInfo(chainId, txn.token);
      bot.sendMessage(
        user.telegramId.toString(),
        `You have received ${ethers.utils.formatUnits(
          txn.amount.toString(),
          token.decimals,
        )} ${token.symbol} deposited from ${txn.wallet.slice()}`,
      );
    }),
  );

  if (!skip) {
    await prisma.blockCheck.create({
      data: { blockHeight: startBlock, chainId },
    });
  }

  console.log('[CHECK BLOCK]', startBlock);
};

if (process.env.NODE_ENV !== 'development') {
  setInterval(() => {
    checkDeposits();
  }, 5000);
}
