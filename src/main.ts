import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
import * as csurf from 'csurf';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

import { AppModule } from './app.module';
import { config } from 'dotenv';
const {
  parsed: { PORT },
} = config();

const port = PORT || 8080;

async function bootstrap() {
  // 根目录
  const rootDir = join(__dirname, '..');
  const app = await NestFactory.create(AppModule);

  // prefix 所有的静态文件路径添加前缀"/public", 需要使用“挂载”功能
  app.useStaticAssets(join(rootDir, 'public'), {
    prefix: '/public',
  });

  // 跨域
  app.enableCors({
    origin: ['http://localhost:3000'],
  });

  // 防止跨站请求伪造
  // app.use(csurf({ cookie: true }));

  // 设置安全的 HTTP headers
  app.use(helmet({ crossdomain: true }));

  // 请求限速
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 分钟
      max: 100, // 将每个IP限制为每个浏览器窗口最多100个请求
    }),
  );

  // 启动
  await app.listen(port);

  Logger.log(`http://localhost:${port}/graphql`, '服务器启动成功');
}
bootstrap();
