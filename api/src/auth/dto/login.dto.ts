
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {

  
    @ApiProperty({default: "valentin.andersen@gmail.com", required: true})
    @IsEmail()
    email: string;
  
    @ApiProperty({default: "13ma", required: true})
    @IsNotEmpty()
    passwd: string;
  }