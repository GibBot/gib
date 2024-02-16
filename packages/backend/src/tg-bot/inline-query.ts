/* eslint-disable prefer-template */
import { BASIC_DOMAIN } from './command';
import { bot, registerInlineQuery } from './core';

registerInlineQuery(
  'start',
  () => ({}),
  async ({ telegramId, queryId }) => {
    bot.answerInlineQuery(queryId, [], {
      cache_time: 60,
      button: JSON.stringify({
        text: 'Send a game',
        web_app: {
          url: `${BASIC_DOMAIN}/create-game?tgId=${telegramId}`,
        },
      }),
    } as any);
  },
);

registerInlineQuery(
  'send',
  ([game]) => ({ game }),
  async ({ queryId, params }) => {
    bot.answerInlineQuery(
      queryId,
      [
        {
          type: 'game',
          game_short_name: params.game,
          id: 'test' + Date.now(),
        },
      ],
      {} as any,
    );
  },
);
