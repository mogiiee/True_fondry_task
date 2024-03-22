import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github'; // Corrected import
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity'; // Make sure this path matches your User entity's location

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID, // Ensure your .env variables are set
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: ['user:email', 'repo'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    let user = await this.userRepository.findOne({ where: { githubId: profile.id.toString() } });
  
    if (!user) {
      user = this.userRepository.create({
        githubId: profile.id.toString(),
        username: profile.username,
        displayName: profile.displayName,
        avatarUrl: profile.photos[0]?.value,
        profileUrl: profile.profileUrl,
        profile: profile._json, // Assuming _json contains the full profile info
        accessToken,
        stars: profile._json.stars, // Assuming stars is a field in the profile JSON
        publicRepos: profile._json.public_repos, // Assuming public_repos is a field in the profile JSON
      });
    } else {
      // Update existing user with possibly updated info
      user.accessToken = accessToken;
      user.avatarUrl = profile.photos[0]?.value;
      // Add or update other fields as needed
    }
  
    await this.userRepository.save(user);
    return user;
  }
}  
