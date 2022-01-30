import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"    
}


@Entity()
export class Users {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
 
  @Column()
  nom: string;

  @Column()
  prenom: string

  @Column({
    unique:true
  })
  email: string
  
  @Column()
  passwd: string

  @Column()
  adresse: string

  @Column()
  ville: string

  @Column({
      type: "int",
      width:5      
  })
  cp: number
  
  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER
})
  role: UserRole
}
