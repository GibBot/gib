import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { jwtVerify } from './jwt';

export interface JwtClaims {
  userId: number;
  telegramId: number;
}

export async function createContext(ctx: CreateFastifyContextOptions) {
  const token = await getJwtToken(ctx.req);
  return {
    ...token,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

async function getJwtToken(req: any) {
  const tokenHeader = req.headers.authorization?.replace('Bearer ', '');

  if (!tokenHeader) {
    return null;
  }
  const token = tokenHeader;
  const res = await jwtVerify<JwtClaims>(token);

  if (!res) {
    return null;
  }
  return res;
}
