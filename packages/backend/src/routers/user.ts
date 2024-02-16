import { TRPCError } from '@trpc/server';
import { BigNumber, ethers } from 'ethers';
import { groupBy, sumBy } from 'lodash';
import { z } from 'zod';
import { getTokenInfo } from '../config/token';
import { watchedTargetWallet } from '../services/on-chain/transaction';
import prisma from '../services/prisma';
import { JwtClaims } from '../trpc';
import { jwtSign } from '../trpc/jwt';
import { authProcedure, publicProcedure, router } from '../trpc/trpc';

// 使用 Telegram ID 登录
const loginByTelegramId = publicProcedure
  .input(
    z.object({
      telegramId: z.number(),
    }),
  )
  .mutation(async ({ input }) => {
    console.log('[用户初始化]', input.telegramId);
    const user = await prisma.user.upsert({
      where: { telegramId: input.telegramId },
      create: { telegramId: input.telegramId },
      update: {},
    });

    const claims: JwtClaims = {
      userId: user.id,
      telegramId: Number(user.telegramId),
    };

    const token = await jwtSign(claims);

    return {
      token,
      userId: Number(user.id),
    };
  });

const getUserTokens = authProcedure.query(async ({ ctx }) => {
  const depositAddr = watchedTargetWallet;
  const user = await prisma.user.findUnique({ where: { id: ctx.userId } });

  const transactions = await prisma.transaction.findMany({
    where: { userId: ctx.userId },
  });

  if (transactions.length === 0) {
    return {
      tokens: [
        {
          name: 'Tether USD',
          symbol: 'USDT',
          icon: '/images/ethereum.svg',
          decimals: 18,
          chain: {
            name: 'Blast',
            icon: 'https://www.ethereum.org/images/logos/ETHEREUM-ICON_Black.png',
          },
          balance: '100',
          chainId: 5,
          address: '0x0',
          usdValue: 1,
        },
      ],
      bindAddress: user?.wallet,
      depositAddr,
      totalUSDVal: 100,
    };
  }

  const txnsByChain = groupBy(transactions, tx => tx.chainId);

  // 再过滤出不同的 token
  const result = Object.entries(txnsByChain)
    .map(([chainId, txs]) => {
      const byToken = groupBy(txs, tx => tx.token);
      return Object.entries(byToken).map(([address]) => {
        // const balance = txs.reduce((sum, tx) => {
        //   return sum.add(BigNumber.from(tx.amount.toHex()));
        // }, BigNumber.from(0));
        const balance = BigNumber.from(ethers.utils.parseEther('100'));
        const token = getTokenInfo(Number(chainId), address);
        const balanceStr = ethers.utils.formatUnits(
          balance,
          token.decimals,
        );
        const balanceNum = Number(balanceStr);

        return {
          balance: balanceStr,
          chainId: Number(chainId),
          address,
          usdValue: balanceNum * 1,
          ...getTokenInfo(Number(chainId), address),
        };
      });
    })
    .flat();

  // 将 sumAmountTransaction 转换成 tokens
  return {
    tokens: [
      {
        name: 'Tether USD',
        symbol: 'USDT',
        icon: '/images/ethereum.svg',
        decimals: 18,
        chain: {
          name: 'Blast',
          icon: 'https://www.ethereum.org/images/logos/ETHEREUM-ICON_Black.png',
        },
        balance: '100',
        chainId: 5,
        address: '0x0',
        usdValue: 1,
      },
    ],
    bindAddress: user?.wallet,
    depositAddr,
    totalUSDVal: sumBy(result, v => v.usdValue),
  };
});

const getUserTransactions = authProcedure.query(async ({ ctx }) => {
  const transactions = await prisma.transaction.findMany({
    where: { userId: ctx.userId },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  return {
    transactions: transactions.map(tx => {
      const token = getTokenInfo(tx.chainId, tx.token!);

      return {
        txId: tx.txId,
        amount: ethers.utils.formatUnits(
          BigNumber.from(tx.amount.toHex()),
          18,
        ),
        token,
        time: tx.createdAt,
        type: tx.type,
        id: tx.id,
        chain: tx.chainId,
      };
    }),
  };
});

const getTransactionById = authProcedure
  .input(z.object({ transactionId: z.number() }))
  .query(async opt => {
    const tx = await prisma.transaction.findFirst({
      where: { id: opt.input.transactionId },
    });

    if (!tx) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
      });
    }

    const token = getTokenInfo(tx.chainId, tx.token!);
    const txType = tx.type;

    const getFromTo = () => {
      switch (txType) {
        case 'DEPOSIT':
          return { from: tx.wallet!, to: tx.userId!.toString() };
        case 'WITHDRAW':
          return { from: tx.userId!.toString(), to: tx.wallet! };
        case 'GRAB':
          return {
            from: tx.gameId!.toString(),
            to: tx.userId!.toString(),
          };
        case 'SEND':
          return {
            from: tx.userId!.toString(),
            to: tx.gameId!.toString(),
          };
        default:
          return {
            from: '',
            to: '',
          };
      }
    };

    return {
      txId: tx.txId,
      amount: ethers.utils.formatUnits(
        BigNumber.from(tx.amount.toHex()),
        18,
      ),
      token,
      time: tx.createdAt,
      type: tx.type,
      id: tx.id,
      chain: tx.chainId,
      ...getFromTo(),
    };
  });

const setAddress = authProcedure
  .input(z.object({ address: z.string() }))
  .mutation(async ({ input, ctx }) => {
    await prisma.user.update({
      where: { id: ctx.userId },
      data: {
        wallet: input.address,
      },
    });

    return true;
  });

export const userRouter = router({
  loginByTelegramId,
  getUserTokens,
  getUserTransactions,
  getTransactionById,
  setAddress,
});
