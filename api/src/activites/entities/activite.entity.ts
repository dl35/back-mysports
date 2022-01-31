import { User } from "src/users/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


export enum ActivityType {
    BIKE = "BIKE",
    RUN = "RUN",
    SWIM = "SWIM"    
}


@Entity()
export class Activite {

    @PrimaryGeneratedColumn()
    id: number;
  
   
    @Column({nullable: false})
    type: ActivityType
   
    @Column({nullable: false})
    dist: number

    @Column({nullable: false})
    date : Date;

    @Column({nullable: true, default:null})
    desc : string | null = null;

    @Column("int", { nullable: false })
    userId: number;


    @ManyToOne(type => User, user => user.activite)
    @JoinColumn({ name: "userId" })
    user: User;

    
}
