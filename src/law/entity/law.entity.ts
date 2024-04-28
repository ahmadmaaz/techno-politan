import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import LawModificationRequest from "./law-modification-request";

@Entity()
export default class Law{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable:true})
    title:string;

    @Column({nullable:true})
    field:string;

    
    @Column({default:0})
    upvotes:number;

    @Column({default:0})
    downvotes:number;

    @Column({nullable:true})
    parliamentMemberName:string;
    
    @OneToMany(() => LawModificationRequest, modificationRequest => modificationRequest.law)
    modificationRequests: LawModificationRequest[];
    @CreateDateColumn()
    createdAt: Date;
}