import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth(@Req() req) {
    // Initiates the GitHub OAuth flow
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  githubCallback(@Req() req, @Res() res) {
      const { username, displayName, avatarUrl } = req.user; // Assuming this data is available
      const queryParams = `?username=${username}&displayName=${displayName}&avatarUrl=${encodeURIComponent(avatarUrl)}`;
      res.redirect(`/success.html${queryParams}`);
  }
  

  }
