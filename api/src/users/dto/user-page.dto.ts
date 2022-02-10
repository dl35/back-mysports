import { CreateUserDto } from './user.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean } from "class-validator";


export class UserPageDto {

    @IsArray()
    @ApiProperty({ isArray: true })
    readonly datas: CreateUserDto[];
  
    @ApiProperty()
    @IsBoolean()
    readonly previous: boolean;
  
    @ApiProperty()
    @IsBoolean()
    readonly next: boolean;

    @ApiProperty()
    @IsBoolean()
    readonly lastPage: number;


    constructor(datas: CreateUserDto[] , next :boolean, prev : boolean , lastPage: number) {
        this.datas = datas ;
        this.next = next ;
        this.previous = prev;
        this.lastPage = lastPage;
      
      }

  }