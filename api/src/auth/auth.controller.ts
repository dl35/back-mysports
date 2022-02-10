import { CreateUserDto } from '../users/dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { Body, Controller,  Get,  Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from './role.guard';
import { Role } from './role.decorator';
import { UserRole } from 'src/users/user.entity';

@ApiTags('Authentification')
@Controller('auth')
export class AuthController {
   

    constructor(private authService: AuthService) {}




    @Post('signin')
    async sigin(@Body() user: LoginDto ) {  

        console.log( "u " , user)

      return this.authService.login( user );
    
    }

    @Role(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RoleGuard)
    @ApiBearerAuth('JWT-auth')
    @Get('profile')
    async profile(@Request() req) {
      const ret ={"success":true}
      console.log( 'profile....', ret);
      return ret ;
    }


      
   
    @Post('signup')
    async signup(@Body() user : CreateUserDto ) {
     
      return this.authService.create( user );
    }




}




