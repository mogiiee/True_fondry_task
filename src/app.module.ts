import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
// Import your User entity
import { User } from './auth/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite', // Name of your database file
      entities: [User], // Add your entities here
      synchronize: true, // Synchronizes the database with your entities
    }),
    AuthModule,
  ],
})
export class AppModule {}
