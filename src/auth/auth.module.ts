import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GithubStrategy } from './github.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; // Import the User entity

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'github' }),
    TypeOrmModule.forFeature([User]), // Add this line
  ],
  providers: [AuthService, GithubStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
