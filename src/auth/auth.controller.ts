import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(':role')
  login(@Param('role') role: string, @Body() authDto: AuthDto) {
    return this.authService.login(authDto, role);
  }
}
