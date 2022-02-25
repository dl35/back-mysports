import { ActivityType } from './../activites/entities/activite.entity';
import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString, IsInt, IsArray } from "class-validator";

export class ParamsGuest {
 
    //id: number;
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    search: string;

  
    
    //  @IsInt()
    @IsOptional()
 
    @ApiPropertyOptional()
    type: ActivityType [] ;
   

}