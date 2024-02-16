import { bot, getOrCreateUser } from './instance';
import { InlineQueryEventConfig } from '../types';

type MsgCtx = {
  userName: string;
  userId: number;
  telegramId: number;
  queryId: string;
};

export const registerInlineQuery = <
  T extends keyof InlineQueryEventConfig,
  P = InlineQueryEventConfig[T],
>(
  event: string,
  mapParams: (paramsArr: string[]) => P,
  cb: (ctx: { params: P } & MsgCtx) => Promise<void>,
) => {
  callback_map[event] = {
    mapper: mapParams as any,
    cb,
  };
};

const callback_map: Record<
  string,
  {
    mapper: (arr: string[]) => Record<string, string | number>;
    cb: (p: { params: any } & MsgCtx) => Promise<void>;
  }
> = {};

bot.on('inline_query', async query => {
  const telegramId = query.from.id;
  const userName = query.from.username!;

  const userId = await getOrCreateUser(telegramId);
  const queryId = query.id;
  const [type, ...paramsArr] = query.query?.split(':') ?? [];

  const cbCfg = callback_map[type];

  if (cbCfg) {
    const mappedParams = cbCfg.mapper(paramsArr);
    cbCfg.cb({
      params: mappedParams,
      userName,
      userId,
      telegramId,
      queryId,
    });
  }
});
