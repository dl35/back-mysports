import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsInt, IsNumber, IsOptional, IsString, Length, Min, ValidateIf } from "class-validator";
import { ActivityType } from "../entities/activite.entity";

export class CreateActiviteDto {

  
    @ApiProperty({default: "RUN", required: true})
    @IsEnum(ActivityType )
    type: ActivityType
   
    @ApiProperty({default: "5000", required: true})
    @IsInt()

    @ValidateIf(o => o.type === ActivityType.BIKE )
    @Min(10000)
    @ValidateIf(o => o.type === ActivityType.RUN )
    @Min(5000)
    @ValidateIf(o => o.type === ActivityType.SWIM )
    @Min(500)
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
