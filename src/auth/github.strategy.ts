import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get('GITHUB_CLIENT_ID'),
      clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get('CALLBACK_URL'),
      scope: ['read:user', 'public_repo'], // Adjust the scope to your needs
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: Function) {
    // Here you would find or create a user in your database
    // For simplicity, we'll just return the profile
    return done(null, profile);
  }
}
