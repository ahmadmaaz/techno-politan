import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";



@Entity()
export class Citizen {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
    @Column({ nullable: false })
    occupation!:string;

    @Column({ nullable: false })
    placeOfBirth!:string;
    

}