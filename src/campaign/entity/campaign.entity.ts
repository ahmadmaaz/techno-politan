import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class Campaign{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("text",{ nullable: false ,array:true})
    goals: string[];

    @Column("text",{ nullable: false ,array:true})
    candidateNames: string[];

    @Column({ nullable: false })
    district:string;

    @Column({ nullable: false })
    politicalDependecy:string;

    @Column({ nullable: false })
    year: number;

    @Column({ nullable: false })
    description:string;

    @Column({ default:0})
    upvotes:number;

    @Column({ default:0})
    downvotes:number;

    @Column({ default:0})
    campaignOutcome:number;

    @Column({ default:false})
    isPoliticalArchive:boolean;

    @CreateDateColumn()
    createdAt: Date;
    
}