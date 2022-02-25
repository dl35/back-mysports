import { Controller, Get,  Param, Query } from '@nestjs/common';
import { GuestService } from './guest.service';
import { ParamsGuest } from './params-guest';


@Controller('guest')
export class GuestController {
  constructor(private readonly guestService: GuestService) {}



  @Get(':page')
  findAll(@Param('page') page: number, @Query() query: ParamsGuest ) {

    console.log( query );
    return  this.guestService.findAll(page, query );
  }




}
