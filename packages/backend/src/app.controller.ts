// @ts-nocheck
import child_process from 'node:child_process';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller()
export class TestController {
  constructor() {
    console.log('TEST CONTROLLER');
  }

  @Post('reload')
  async reload(@Body() body: { payload: string }) {
    const payload = JSON.parse(body.payload);
    if (payload.ref === 'refs/heads/master') {
      child_process.execSync('git pull && pnpm i && pnpm start:reload', {
        cwd: '/root/AI-imgs/packages/backend',
      });
    }

    return 'Reload';
  }

  @Get('test')
  async test() {
    return 'Hello1234';
  }
}
