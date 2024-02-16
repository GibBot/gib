import { z } from 'zod';
import { authProcedure, router } from '../trpc/trpc';

// 处理入金

export const feeRouter = router({
  confirmDeposit: authProcedure
    .input(
      z.object({
        txId: z.string(),
        chainId: z.number(),
      }),
    )
    .mutation(async () => {
      return {
        success: true,
      };
    }),

  confirmWithdraw: authProcedure
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
    }),
});
