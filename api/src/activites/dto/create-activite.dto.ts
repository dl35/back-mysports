import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsInt, isNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length, Min, Validate, ValidateIf } from "class-validator";
import { ActivityType } from "../entities/activite.entity";
import { ValidationDist } from "./ValidationDist";

export class CreateActiviteDto {

  
    @ApiProperty({default: "RUN", required: true})
    @IsEnum(ActivityType )
    type: ActivityType
   
    @ApiProperty({default: "5000", required: true})
    @IsInt()
    @IsPositive()
    @Validate(ValidationDist)
    dist: number

    @ApiProperty({default: new Date() , required: true}) 
    @Type(() => Date)
    @IsDate()
    date : Date;

    @ApiProperty({default: "description....", required: false})
    @IsOptional()
    @IsString()
    desc : string | null = null;


  
    @ApiProperty({default: 1})
    @IsOptional()
    @IsNumber()
    userId : number;


}
