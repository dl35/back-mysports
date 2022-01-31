import { CreateUserDto } from './users.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean } from "class-validator";


export class PaginateDto {

    @IsArray()
    @ApiProperty({ isArray: true })
    readonly data: CreateUserDto[];
  
    @ApiProperty()
    @IsBoolean()
    readonly hasPreviousPage: boolean;
  
    @ApiProperty()
    @IsBoolean()
    readonly hasNextPage: boolean;


    constructor(data: CreateUserDto[] , next :boolean, prev : boolean ) {
        this.data = data ;
        this.hasNextPage = next ;
        this.hasPreviousPage = prev;
      
      }

  }