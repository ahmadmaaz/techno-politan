import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    

    @CreateDateColumn()
    createdAt: Date;
}