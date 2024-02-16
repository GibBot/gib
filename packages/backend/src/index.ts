/* eslint-disable import/first */

const moduleAlias = require('module-alias');

moduleAlias.addAlias('@', __dirname);

import { NestFactory } from '@nestjs/core';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import { AppModule } from './app.module';
import { appRouter } from './routers';
import { startBot } from './tg-bot';
import { createContext } from './trpc/context';
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';
import './services/on-chain';

dotenvConfig({ path: resolve(__dirname, '../.env') });

export * from '@trpc/server';
export { type AppRouter } from './routers';

async function bootstrap() {
  await startBot();
  const adapter = new FastifyAdapter();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    adapter,
    {
      cors: true,
    },
  );

  await app.register(fastifyTRPCPlugin, {
    prefix: '/trpc',
    trpcOptions: {
      router: appRouter,
      createContext,
    },
  });

  await app.listen(process.env.PORT || 3009, '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
