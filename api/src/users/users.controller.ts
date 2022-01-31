import { DeleteResult, UpdateResult } from 'typeorm';
import { PaginateDto } from './dto/paginate.dto';
import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/users.dto';
import { UserRole, User } from './user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { ParamsPaginateDto } from './dto/params-paginate.dto';
import { Request } from 'express';

@ApiBearerAuth('JWT-auth')
@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Role(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }


  @Role(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @Get()
  findAll( @Query() params:  ParamsPaginateDto ) : Promise<PaginateDto> {
    return this.usersService.findAll( params );
  }


  @HttpCode(200)
  @Get(':id')
  findOne(@Req()req: Request , @Param('id', ParseIntPipe  ) id: number): Promise<User> {

    // si pas admin controle id...
    console.log( req );
    return this.usersService.findUser(id);
  }

  @HttpCode(200)
  @Patch(':id')
  update(@Param('id', ParseIntPipe  ) id: number  , @Body() createUserDto: CreateUserDto  ): Promise<UpdateResult> {
    //si pas admin controler id...

    return this.usersService.update(id , createUserDto );
  }

  @Role(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.usersService.remove(id);
  }
}


