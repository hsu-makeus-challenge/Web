import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import express from 'express';

@Controller('auth/google')
export class AuthController {
  @Get('login')
  @UseGuards(AuthGuard('google'))
  googleLogin(): void {
    // Google 로그인 리다이렉트 처리
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req: express.Request, @Res() res: express.Response): Promise<void> {
    const user = req.user as any;
    const { email, name } = user;

    const accessToken = '임시AccessToken';
    const refreshToken = '임시RefreshToken';

    return res.redirect(
      `http://localhost:5173/login?accessToken=${accessToken}&refreshToken=${refreshToken}&name=${name}&email=${email}`
    );
  }
}
