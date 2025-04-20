import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller({
  path: '/api/v1/auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: AuthUserDto) {
    const token = await this.authService.validateUser(body);
    if (!token) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
