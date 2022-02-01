import { CreateActiviteDto } from './create-activite.dto';

import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean } from "class-validator";


export class ActivitePageDto {

    @IsArray()
    @ApiProperty({ isArray: true })
    readonly data: CreateActiviteDto[];
  
    @ApiProperty()
    @IsBoolean()
    readonly hasPreviousPage: boolean;
  
    @ApiProperty()
    @IsBoolean()
    readonly hasNextPage: boolean;


    constructor(data: CreateActiviteDto[] , next :boolean, prev : boolean ) {
        this.data = data ;
        this.hasNextPage = next ;
        this.hasPreviousPage = prev;
      
      }

  }