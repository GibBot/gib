import TelegramBot from 'node-telegram-bot-api';
import prisma from '../../services/prisma';

const token = process.env.TGBOT_TOKEN!;

export const bot = new TelegramBot(token);

export const startBot = () => {
  bot.startPolling();
};

export const getOrCreateUser = async (telegramId: number) => {
  let user = await prisma.user.findFirst({
    where: { telegramId },
  });

  if (!user) {
    user = await prisma.user.create({
      data: { telegramId },
    });
  }

  return user.id;
};
