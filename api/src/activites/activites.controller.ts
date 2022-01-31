import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActivitesService } from './activites.service';
import { CreateActiviteDto } from './dto/create-activite.dto';
import { UpdateActiviteDto } from './dto/update-activite.dto';


@ApiTags('Activities')
@Controller('activites')
export class ActivitesController {
  constructor(private readonly activitesService: ActivitesService) {}

  @Post()
  create(@Body() createActiviteDto: CreateActiviteDto) {
    return this.activitesService.create(createActiviteDto);
  }

  @Get()
  findAll() {
    return this.activitesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitesService.get(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActiviteDto: UpdateActiviteDto) {
    return this.activitesService.update(+id, updateActiviteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitesService.remove(+id);
  }
}
