import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { config } from 'dotenv';
const {
  parsed: { PORT },
} = config();

const port = PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(port);

  Logger.log(`http://localhost:${port}/graphql`, '服务器启动成功');
}
bootstrap();
