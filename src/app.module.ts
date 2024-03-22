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
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, '../database.sqlite'),
      entities: [User],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
