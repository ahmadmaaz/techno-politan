import { User } from "../../auth/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Law from "./law.entity";

@Entity()
export default class LawModificationRequest{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable:true})
    description:string;

    @ManyToOne(() => Law)
    @JoinColumn()
    law: Law;

    @ManyToOne(()=>User)
    @JoinColumn()
    user:User;

    @CreateDateColumn()
    createdAt: Date;
}