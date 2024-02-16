import { TRPCError, initTRPC } from '@trpc/server';
import type { Context } from './context';

const t = initTRPC.context<Context>().create();

const isAuth = t.middleware(opts => {
  const { ctx } = opts;

  if (!ctx.userId || !ctx.telegramId)
    throw new TRPCError({ code: 'UNAUTHORIZED' });

  const { userId, telegramId } = ctx;

  return opts.next({
    ctx: {
      userId,
      telegramId,
    },
  });
});

export const { router } = t;
export const publicProcedure = t.procedure;

export const authProcedure = publicProcedure.use(isAuth);
