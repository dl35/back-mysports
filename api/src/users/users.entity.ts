import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"    
}


@Entity()
export class Users {

  @PrimaryGeneratedColumn()
  id: number;

 
  @Column({nullable: false})
  nom: string;

  @Column({nullable: false})
  prenom: string

  @Column({
    unique:true, 
    nullable: false
  })
  email: string
  
  @Column({nullable: false})
  passwd: string

  @Column({nullable: false})
  adresse: string

  @Column({nullable: false})
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
