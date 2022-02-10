import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {  IsInt,  IsNumber,  IsOptional, IsString } from 'class-validator';


export class ParamsPaginateDto {
 
    //id: number;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    search: string;


    @ApiPropertyOptional()
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    size: number = 15;

    @ApiProperty({
        type: Number,
        default : 1
      })
    
    //  @IsInt()
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @ApiPropertyOptional()
    page: number = 1 ;
   

}