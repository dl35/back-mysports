import { CreateUserDto } from './../users/dto/users.dto';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
        constructor(
          private usersService: UsersService,
          private jwtService: JwtService
        ) {}

  async validateUser( u: LoginDto): Promise<User> {
    const user = await this.usersService.findByEmail(u.email);
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

  async create(createUserDto: CreateUserDto): Promise<User> {
    const users = new User();
    users.nom = createUserDto.nom;
    users.prenom = createUserDto.prenom;
    users.email = createUserDto.email;
    users.passwd = createUserDto.passwd;
    users.adresse = createUserDto.adresse;
    users.ville = createUserDto.ville;
    users.cp = createUserDto.cp;
    if( createUserDto.role )
        users.role = createUserDto.role;

    const u = await this.usersService.findByEmail(users.email) ;
    if( u ){
      throw new ConflictException('User already exist');
     
    }

    return this.usersService.save(users);
  }


}
