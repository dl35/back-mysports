import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {  IsEmail,  IsEnum,  IsInt,  IsNotEmpty,   IsNumber,   IsOptional, IsPostalCode, Length, Max, Min, min, } from 'class-validator';
import { UserRole } from "../user.entity";

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
    @IsString()
    @Length(5)
    cp: string;

    @ApiProperty({
      default: 'USER'
    })
    @IsOptional()
    @IsEnum( UserRole )
    role: UserRole;


  }