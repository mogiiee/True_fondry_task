import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GithubStrategy } from './github.strategy';
import { AuthController } from './auth.controller'; // Make sure this is imported
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule],
  providers: [AuthService, GithubStrategy],
  controllers: [AuthController], // Add AuthController here
})
export class AuthModule {}
