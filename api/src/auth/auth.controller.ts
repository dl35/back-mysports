import { Controller,  Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local.guard';
import { JwtAuthGuard } from './jwt.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
   

    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('profile')
    async profile(@Request() req) {
      return this.authService.login(req.user);
    }


}




