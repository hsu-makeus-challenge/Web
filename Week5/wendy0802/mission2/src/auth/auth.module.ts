import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller'; 
import { GoogleStrategy } from './google.strategy';

@Module({
  imports: [PassportModule, ConfigModule],
  controllers: [AuthController],
  providers: [GoogleStrategy],
})
export class AuthModule {}
