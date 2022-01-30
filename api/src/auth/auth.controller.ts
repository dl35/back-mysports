import { LoginDto } from './dto/login.dto';
import { Body, Controller,  Get,  Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleGuard } from './role.guard';
import { Role } from './role.decorator';
import { UserRole } from 'src/users/users.entity';


@Controller('auth')
export class AuthController {
   

    constructor(private authService: AuthService) {}


    @Post('login')
    async login(@Body() user: LoginDto ) {  

      return this.authService.login( user );
    
    }

    @Role(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleGuard)
    @ApiBearerAuth('JWT-auth')
    @Get('profile')
    async profile(@Request() req) {
      console.log( 'ok....', req.user );
      return "ok";
    }


}




