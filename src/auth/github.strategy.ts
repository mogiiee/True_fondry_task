import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity'; // Import the User entity

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: ['user:email', 'repo'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const { id, username, photos } = profile;
    let user = await this.userRepository.findOne({ where: { githubId: id } });
    
    if (!user) {
      user = this.userRepository.create({
        githubId: id,
        username: username,
        avatarUrl: photos[0].value,
        accessToken,
      });
      await this.userRepository.save(user);
    }

    return user;
  }
}
