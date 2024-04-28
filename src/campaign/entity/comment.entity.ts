import {  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Campaign from "./campaign.entity";
import { User } from "../../auth/entity/user.entity";

@Entity()
export default class Comment{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable:false})
    comment:string;


    @ManyToOne(() => Campaign)
    @JoinColumn()
    campaign: Campaign;

    @ManyToOne(()=>User)
    @JoinColumn()
    user:User;

    @CreateDateColumn()
    createdAt: Date;
}