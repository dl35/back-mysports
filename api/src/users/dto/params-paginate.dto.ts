import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {  IsInt,  IsOptional } from 'class-validator';


export class ParamsPaginateDto {
 
    //id: number;
    @ApiPropertyOptional()
    @IsOptional()
    search: string;


    @ApiProperty({
        type: Number,
        default : 1
      })
    
    //  @IsInt()
    @IsOptional()
    @ApiPropertyOptional()
    page: number = 1 ;
   

}