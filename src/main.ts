import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const APP_PORT = process.env.APP_PORT || 3000;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  await app.listen(APP_PORT);
  console.log(`API is Running on PORT ${APP_PORT}. 🚀`);
}
void bootstrap();
