import { Activite } from '../activites/entities/activite.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"    
}


@Entity()
export class User {

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
      
      width:5      
  })
  cp: string
  
  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER
})
  role: UserRole


  @OneToMany(() => Activite, activite => activite.user)
  activite: Activite[];



}
