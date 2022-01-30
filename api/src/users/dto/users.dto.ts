import {  IsEmail,  IsEnum,  IsNotEmpty,   IsNumber,   IsOptional, } from 'class-validator';
import { UserRole } from "../users.entity";

export class CreateUserDto {
 
    //id: number;
    
    @IsNotEmpty()
    nom: string;

    @IsNotEmpty()
    prenom: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    passwd: string;

    @IsNotEmpty()
    adresse: string;

    @IsNotEmpty()
    ville: string;

    @IsNumber()
    cp: number;

    @IsOptional()
    @IsEnum( UserRole )
    role: UserRole;


  }