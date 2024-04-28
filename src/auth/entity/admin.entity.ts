import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";



@Entity()
export class Admin {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

}