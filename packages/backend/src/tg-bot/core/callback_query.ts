import { CallbackQueryEventConfig } from '../types';
import { bot, getOrCreateUser } from './instance';

type MsgCtx = {
  userName: string;
  userId: number;
  telegramId: number;
  chatId: number;
};

export const registerCallbackQuery = <
  T extends keyof CallbackQueryEventConfig,
  P = CallbackQueryEventConfig[T],
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

let gameQueryCb: (ctx: {
  gameName: string;
  queryId: string;
  telegramId: number;
}) => Promise<{ url: string }> = () => Promise.resolve({ url: '' });
export const onGameQuery = (cb: typeof gameQueryCb) => {
  gameQueryCb = cb;
};

const callback_map: Record<
  string,
  {
    mapper: (arr: string[]) => Record<string, string | number>;
    cb: (p: { params: any } & MsgCtx) => Promise<void>;
  }
> = {};

bot.on('callback_query', async query => {
  if (query.game_short_name) {
    const { url } = await gameQueryCb({
      queryId: query.id,
      gameName: query.game_short_name,
      telegramId: query.from.id,
    });

    bot.answerCallbackQuery(query.id, {
      url: url ?? '',
    });

    return;
  }

  const { message } = query;
  const chatId = message?.chat.id;
  const telegramId = query.from.id;
  const userName = query.from.username!;

  if (!chatId) return;

  const userId = await getOrCreateUser(telegramId);

  const [type, ...paramsArr] = query.data?.split(':') ?? [];

  const cbCfg = callback_map[type];

  if (cbCfg) {
    const mappedParams = cbCfg.mapper(paramsArr);
    cbCfg.cb({
      params: mappedParams,
      userName,
      userId,
      telegramId,
      chatId,
    });
  }
});
