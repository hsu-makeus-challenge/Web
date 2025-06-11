 import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service'; // 같은 폴더에 있는 user.service.ts
import { JwtService } from '@nestjs/jwt';

@Controller('auth/google')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('login')
  @UseGuards(AuthGuard('google'))
  googleLogin(): void {
    // Google OAuth 로그인 진입점
  }

  @Get('redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req: any, @Res() res: any): Promise<void> {
    try {
      const { email, name } = req.user;

      if (!email || !name) {
        throw new Error('User information is missing');
      }

      // 유저 생성 또는 조회
      const user = await this.userService.findOrCreateByEmail(email, name);

      if (!user) {
        throw new Error('User creation or lookup failed');
      }

      // JWT 발급
      const accessToken = this.jwtService.sign({ sub: user.id });
      const refreshToken = this.jwtService.sign({ sub: user.id }, { expiresIn: '7d' });

      // 프론트엔드로 리다이렉트하면서 토큰 전달
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      return res.redirect(
        `${frontendUrl}/login?accessToken=${accessToken}&refreshToken=${refreshToken}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`
      );
    } catch (error) {
      console.error('Google OAuth error:', error);
      return res.redirect(`${process.env.FRONTEND_URL || 'http://localhost:5173'}/login?error=oauth_failed`);
    }
  }
}
