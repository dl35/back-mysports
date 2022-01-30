import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
        constructor(
          private usersService: UsersService,
          private jwtService: JwtService
        ) {}

  async validateUser( u: LoginDto): Promise<Users> {
    const user = await this.usersService.findEmail(u.email);
    if (user && user.passwd === u.passwd) {
      //const { passwd, ...result } = user;
      //return result;
      return user;
    } else {
      throw new UnauthorizedException();
    }
    
  }

  async login(u: LoginDto ) {

      const  user = await this.validateUser( u )
      const payload = { id: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
