import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { ActivityType } from "../entities/activite.entity";

export class CreateActiviteDto {

  
    @ApiProperty({default: "RUN", required: true})
    @IsString()
    type: ActivityType
   
    @ApiProperty({default: "5000", required: true})
    @IsInt()
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
    userid : number;


}
