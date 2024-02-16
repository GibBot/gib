import { router } from '../../trpc/trpc';
import * as moneyGun from './money-gun';

export const gameRouter = router({
  moneyGun: router({
    ...moneyGun,
  }),
});
