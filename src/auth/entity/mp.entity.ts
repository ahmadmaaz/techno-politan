import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";



@Entity()
export class MP {
    @PrimaryGeneratedColumn('uuid')
    id?: number;
    @Column({ nullable: false })
    position!:string;

    @Column({ nullable: false })
    startDate!:Date;

    @Column({ nullable: false })
    endDate!:Date;

    @Column({ nullable: false })
    relatedParty!:string;

    @Column({ nullable: false })
    biography!:string;

}