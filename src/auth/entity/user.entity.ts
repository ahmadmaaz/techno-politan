import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Admin } from './admin.entity';
import { PC } from './pc.entity';
import { MP } from './mp.entity';
import { Citizen } from './citizen.entity';

  

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column({ nullable: false })
    firstName!: string;

    @Column({ nullable: false })
    middleName!: string;

    @Column({ nullable: false })
    lastName!: string;
    
    @Column({ nullable: false })
    phoneNumber!:string;

    @Column({ nullable: false ,unique:true})
    email!:string;

    @Column({ nullable: false })
    dob:Date;

    @Column({ nullable: false })
    education!:string;

    @Column({ nullable: false })
    contactInformation!:string;

    @Column({ nullable: false })
    password!: string;

    @CreateDateColumn()
    createdAt: Date;
    

    @OneToOne(type => Admin,{cascade:true}) 
    @JoinColumn()
    admin?: Admin;
  
    @OneToOne(type => PC,{cascade:true}) 
    @JoinColumn()
    pc?: PC;

    @OneToOne(type => MP,{cascade:true}) 
    @JoinColumn()
    mp?: MP;

    @OneToOne(type => Citizen,{cascade:true}) 
    @JoinColumn()
    citizen?: Citizen;
}