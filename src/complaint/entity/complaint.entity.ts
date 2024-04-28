import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Complaint{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false })
    content:string;

    @Column({ nullable: false })
    publisher:string;

    @Column({ nullable: false })
    govOrgName: number;


    @Column({ default:0})
    upvotes:number;

    @Column({ default:0})
    downvotes:number;

    @CreateDateColumn()
    createdAt: Date;
    
}