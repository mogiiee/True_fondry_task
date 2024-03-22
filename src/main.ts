import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const databasePath = path.join(__dirname, '../database.sqlite');

  // Check if the database file exists
  if (!fs.existsSync(databasePath)) {
    // If the database does not exist, you can log a message, create a file, or perform initialization.
    // For SQLite and TypeORM, just logging a message as TypeORM will create the file.
    console.log('Database does not exist. TypeORM will create the database.');
  }

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
