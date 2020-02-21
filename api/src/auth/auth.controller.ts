import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto } from '../user/dto/user-create.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @Post('')
  async register(@Body() user: UserCreateDto) {
    return await this.authService.register(user);
  }
}
