import { Activite } from './activite.entity';
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNumber } from "class-validator";


export class ActivitePage {

    @IsArray()
    @ApiProperty({ isArray: true })
    readonly datas: Activite[];
  
    @ApiProperty()
    @IsNumber()
    readonly total: number;


    constructor(datas: Activite[] , total : number ) {
        this.datas = datas ;
        this.total = total ;
       
      
      }

  }