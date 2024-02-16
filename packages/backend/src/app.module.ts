import type { NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TestController } from './app.controller';

// @ts-ignore
@Module({
  imports: [],
  controllers: [TestController],
})
export class AppModule implements NestModule {
  configure() {}
  constructor() {}
}
