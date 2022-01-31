import { ApiProperty } from '@nestjs/swagger';
import {  IsEmail,  IsEnum,  IsNotEmpty,   IsNumber,   IsOptional, Length, min, } from 'class-validator';
import { UserRole } from "../users.entity";

export class CreateUserDto {
 
    //id: number;
    @ApiProperty({
      default: 'test'
    })
    @IsNotEmpty()
    nom: string;

    @ApiProperty({
      default: 'test'
    })
    @IsNotEmpty()
    prenom: string;

    @ApiProperty({
      default: 'test'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
      default: '1234'
    })
    @IsNotEmpty()
    passwd: string;

    @ApiProperty({
      default: '10 rue de test'
    })
    @IsNotEmpty()
    adresse: string;


    @ApiProperty({
      default: 'Rennes'
    })
    @IsNotEmpty()
    ville: string;

    @ApiProperty({
      default: '35000'
    })
    @IsNumber()
    //@Length(5)
    cp: number;

    @ApiProperty({
      default: 'USER'
    })
    @IsOptional()
    @IsEnum( UserRole )
    role: UserRole;


  }