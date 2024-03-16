import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './auth/auth.module'; 
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule global, no need to import in other modules
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // Serve static files from /public
    }),
    AuthModule, // Import the AuthModule here
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
