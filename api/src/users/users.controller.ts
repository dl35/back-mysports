import { UserComplete } from './dto/user.complete.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UserPageDto } from './dto/user-page.dto';
import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserRole, User } from './user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { ParamsPaginateDto } from './dto/params-paginate.dto';


@ApiBearerAuth('JWT-auth')
@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Controller('user')
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

  //@Role(UserRole.ADMIN)
  //@UseGuards(RoleGuard)
  @Get()
  findAll( @Query() params:  ParamsPaginateDto ) : Promise<UserPageDto> {
    return  this.usersService.findAll( params );
  }


  @Get("autocomplete")
  autocomplete( @Query() params: {search: string } ) : Promise<UserComplete[]> {
    return  this.usersService.autocomplete( params.search) ;
  }



  @HttpCode(200)
  @Get('/profile')
  getprofile(@Request()req ): Promise<User> {
      return this.usersService.findUser(req.user.id);
    
  }
  @HttpCode(200)
  @Patch('/profile')
  patchprofile(@Request()req , @Body() createUserDto: CreateUserDto): Promise<UpdateResult> {
      return  this.usersService.update(req.user.id , createUserDto );
  }


  @Role(UserRole.ADMIN)
  @UseGuards(RoleGuard) 
  @HttpCode(200)
  @Get(':id')
  get(@Param('id', ParseIntPipe  ) id: number): Promise<User> {
            return this.usersService.findUser(id);
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


