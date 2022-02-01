import { DeleteResult, UpdateResult } from 'typeorm';
import { UserPageDto } from './dto/users-page.dto';
import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/users.dto';
import { UserRole, User } from './user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { ParamsPaginateDto } from './dto/params-paginate.dto';


@ApiBearerAuth('JWT-auth')
@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  /*
  @Role(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
  */

  @Role(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @Get()
  findAll( @Query() params:  ParamsPaginateDto ) : Promise<UserPageDto> {
    return this.usersService.findAll( params );
  }


  @HttpCode(200)
  @Get(':id')
  get(@Request()req , @Param('id', ParseIntPipe  ) id: number): Promise<User> {
      
     if ( req.user && req.user.id && req.user.role) {

          if( req.user.role == UserRole.ADMIN ) {
            return this.usersService.findUser(id);
          } else if ( req.user.id  == id ) {
            return this.usersService.findUser(id);
          } else {
            throw new UnauthorizedException()
          }

      } else {
            throw new UnauthorizedException()
           }
   
  }

  @HttpCode(200)
  @Patch(':id')
  update(@Request()req , @Param('id', ParseIntPipe  ) id: number  , @Body() createUserDto: CreateUserDto  ): Promise<UpdateResult> {
   
    if ( req.user && req.user.id && req.user.role) {

      if( req.user.role == UserRole.ADMIN ) {
        return this.usersService.update(id , createUserDto );
      } else if ( req.user.id  == id ) {
        return this.usersService.update(id , createUserDto );
      } else {
        throw new UnauthorizedException()
      }

  } else {
        throw new UnauthorizedException()
       }
    
  }

  @Role(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @Delete(':id')
  remove(@Request()req , @Param('id') id: number): Promise<DeleteResult> {

    if ( req.user && req.user.id == id) {
      throw new UnauthorizedException()
    }


    return this.usersService.remove(id);
  }
}


