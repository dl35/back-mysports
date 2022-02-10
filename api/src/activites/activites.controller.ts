import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, Request, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { ParamsPaginateDto } from 'src/users/dto/params-paginate.dto';
import { UserRole } from 'src/users/user.entity';
import { ActivitesService } from './activites.service';
import { CreateActiviteDto } from './dto/create-activite.dto';
import { UpdateActiviteDto } from './dto/update-activite.dto';

@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@ApiTags('Activities')
@Controller('activite')
export class ActivitesController {
  constructor(private readonly activitesService: ActivitesService) {}

  @Post()
  create(@Body() createActiviteDto: CreateActiviteDto) {
    return this.activitesService.create(createActiviteDto);
  }


  @Role(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @Get('/from/:id')
  findAllFromAdmin(@Param('id', ParseIntPipe  ) id: number,  @Query() params:  ParamsPaginateDto ) {
          return this.activitesService.findAll( id , params );
  }



  @Get()
  findAll(@Request()req ,  @Query() params:  ParamsPaginateDto ) {
   
      if( req.user && req.user.id) {
        return this.activitesService.findAll( req.user.id , params );
      } else {
          throw new UnauthorizedException()
      }
    
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe  ) id: number) {
    return this.activitesService.get(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe  ) id: number, @Body() updateActiviteDto: UpdateActiviteDto) {
    return this.activitesService.update(id, updateActiviteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe  ) id: number) {
    return this.activitesService.remove(id);
  }
}
