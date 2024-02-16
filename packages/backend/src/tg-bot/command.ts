import { bot, getOrCreateUser } from './core';

export const BASIC_DOMAIN = process.env.FRONTEND_DOMAIN!;

const onCommandReplyMApp = (
  command: string,
  getUrl: (userId: number) => Promise<string>,
  options?: {
    message?: string;
    buttonMsg?: string;
  },
) => {
  bot.onText(new RegExp(`/${command}`), async msg => {
    const chatId = msg.chat.id;
    const telegramId = msg.from?.id;

    if (msg.chat.type !== 'private') {
      bot.sendMessage(chatId, 'Please use this command in private chat');
      return;
    }

    if (!telegramId) return;

    const userId = await getOrCreateUser(telegramId);
    const url = await getUrl(userId);

    bot.sendMessage(
      chatId,
      options?.message ?? `Please click the button below to continue`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: options?.buttonMsg ?? 'Enter App',
                web_app: { url },
              },
            ],
          ],
        },
      },
    );
  });
};

bot.onText(/\/help/, async msg => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Here is help`);
});

onCommandReplyMApp('balance', async () => {
  return `${BASIC_DOMAIN}/balance`;
});

onCommandReplyMApp('deposit', async () => {
  return `${BASIC_DOMAIN}/deposit`;
});

onCommandReplyMApp('withdraw', async () => {
  return `${BASIC_DOMAIN}/withdraw`;
});

onCommandReplyMApp(
  'start',
  async () => {
    return `${BASIC_DOMAIN}/create-game`;
  },
  {
    message: 'Please select a game to send',
    buttonMsg: 'Select Game',
  },
);
