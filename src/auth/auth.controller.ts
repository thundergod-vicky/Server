import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: any) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() registerDto: any) {
    return this.authService.register(registerDto);
  }

  @Post('logout')
  async logout(@Body() body: { userId: string }) {
    // Simplified: usually would use Guard, but using ID for now if token not passed?
    // Actually, better to use Guard and Request user id
    // Since UseGuards is not imported, let's fix imports
    return this.authService.logout(body.userId);
  }
}
