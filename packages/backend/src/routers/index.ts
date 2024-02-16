import { router } from '../trpc';
import { feeRouter } from './fee';
import { gameRouter } from './game';
import { userRouter } from './user';

export const appRouter = router({
  fee: feeRouter,
  game: gameRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
