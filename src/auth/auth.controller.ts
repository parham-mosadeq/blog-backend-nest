import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from 'src/infrastructure';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/create-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller({
  path: '/api/v1/auth',
  version: '1',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @Public()
  async login(@Body() body: AuthUserDto) {
    const user = await this.authService.login(body);
    console.log(user, 'jwt');
    return user;
  }

  @Post('/register')
  @Public()
  async register(@Body() body: AuthUserDto) {
    return await this.authService.register(body);
  }
}
