import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class UserComplete {
 
  
    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty()
    nom: string;

    @IsString()
    @IsNotEmpty()
    prenom: string;

}