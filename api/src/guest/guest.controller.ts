import { Controller, Get,  Param } from '@nestjs/common';
import { GuestService } from './guest.service';


@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}



  @Get(':page')
  findAll(@Param('page') page: number) {
    return  this.guestService.findAll(page);
  }




}
