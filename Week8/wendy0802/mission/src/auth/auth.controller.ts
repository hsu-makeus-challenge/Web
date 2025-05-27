import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Controller('auth/google')
export class AuthController {
  constructor(
    private readonly userService: UserService, // 변수명 오타 수정
    private readonly jwtService: JwtService,
  ) {}

  @Get('redirect')
  @UseGuards(AuthGuard('google')) // 데코레이터 위치 수정
  async googleRedirect(@Req() req: any, @Res() res: Response): Promise<void> {
    try {
      const { email, name } = req.user;

      if (!email || !name) {
        return res.redirect(
          `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=missing_user`,
        );
      }

      const user = await this.userService.findOrCreateByEmail(email, name); // 변수명 오타 수정
      if (!user) {
        return res.redirect(
          `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=user_not_found`,
        );
      }

      const accessToken = this.jwtService.sign({ sub: user.id });
      const refreshToken = this.jwtService.sign(
        { sub: user.id },
        { expiresIn: '7d' },
      );

      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      const redirectUrl = `${frontendUrl}/login?accessToken=${accessToken}&refreshToken=${refreshToken}&name=${encodeURIComponent(
        name,
      )}&email=${encodeURIComponent(email)}`;

      return res.redirect(redirectUrl);
    } catch (error) {
      console.error('Google OAuth error:', error);
      return res.redirect(
        `${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=oauth_failed`,
      );
    }
  }
}