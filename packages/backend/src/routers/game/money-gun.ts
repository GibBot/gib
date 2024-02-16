import { z } from 'zod';
import { authProcedure } from '../../trpc/trpc';
import prisma from '../../services/prisma';

export const create = authProcedure
  .input(
    z.object({
      chainId: z.number(),
      wallet: z.string(),
      token: z.string(),
      amount: z.number().min(0),
    }),
  )
  .mutation(async () => {
    return {
      success: true,
    };
  });

export const join = authProcedure
  .input(z.object({ gameId: z.number() }))
  .mutation(async ({ input: { gameId }, ctx: { userId } }) => {
    const tx = await prisma.transaction.findFirst({
      where: { gameId, userId },
    });

    if (tx) {
      throw new Error('You already joined this game');
    }

    // await prisma.transaction.create({
    //   data: {
    //     gameId,
    //     userId,
    //     amount: 1,
    //   },
    // });
  });
