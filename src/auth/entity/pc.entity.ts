import { Column, Entity, OneToOne, PrimaryGeneratedColumn   } from "typeorm";
import { User } from "./user.entity";



@Entity()
export class PC {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column({ nullable: false })
    campaignName!:string;

    @Column({ nullable: false })
    studyField!:string;

    @Column({ nullable: false })
    politicalParty!:string;

    @Column({ nullable: false })
    biography!:string;


}