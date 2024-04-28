import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Law from './entity/law.entity';
import LawDTO from './dto/law.dto';
import { User } from 'src/auth/entity/user.entity';
import { Response } from 'express';
import { plainToClass } from 'class-transformer';
import LawModificationRequest from './entity/law-modification-request';
import LawModificationRequestDTO from './dto/law-modification-request.dto';

@Injectable()
export class LawService {
    constructor(
        @InjectRepository(Law)
        private lawRepository: Repository<Law>,
        @InjectRepository(LawModificationRequest)
        private lawModificationRepository: Repository<LawModificationRequest>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async proposeLaw(dto:LawDTO,user:User, res:Response){
        const userInDb =await  this.userRepository.findOneBy({
            email:user.email
        })
        const law =plainToClass(Law, dto);
        return res.status(200).send(await this.lawRepository.save({
            ...law,
            parliamentMemberName: userInDb.firstName + " " + userInDb.lastName
        }));
    }
    async updateLaw(id:string,dto:LawDTO, res:Response){
        const law =await  this.lawRepository.findOneBy({
            id:id
        })
        if(!law)
            res.status(400).send({ message: "Law doesn't exist" });

        return res.status(200).send(await this.lawRepository.save({
            ...law,
            ...dto,
            id:id,
            downvotes:0,
            upvotes:0
        }));
    }

    async findAll(res:Response){
        const laws= await this.lawRepository.find({relations:['modificationRequests','modificationRequests.user']});
        laws.forEach((law:Law) =>{
            law.modificationRequests= law.modificationRequests.map((req:LawModificationRequest)=>({
                ...req,
                userEmail:req.user.email,
                userName: req.user.firstName + " " + req.user.lastName
            }))
            law.modificationRequests.forEach((lw)=> delete lw.user)
        })
        return res.status(200).send(laws);
    }
    async voteLaw(id: string, isUpvote: boolean, res: Response) {
        const law = await this.lawRepository.findOneBy({
          id: id,
        });
        if (!law) {
          res.status(400).send({ message: "Law doesn't exist" });
        }

        if (isUpvote) law.upvotes++;
        else law.downvotes++;
        return res.status(200).send(await this.lawRepository.save(law));
    }
    async requestModification(dto:LawModificationRequestDTO,lawId:string,user:User,res:Response){
        const law = await this.lawRepository.findOneBy({
            id: lawId,
        });
        if (!law) {
            res.status(400).send({ message: "Law doesn't exist" });
        }

        const userInDb =await  this.userRepository.findOneBy({
            email:user.email
        })
        const lawModification =plainToClass(LawModificationRequest, dto);
        return res.status(200).send(await this.lawModificationRepository.save({
            ...lawModification,
            user:userInDb,
            law:law
        }));
    }
    async approveReqModification(lawId:string,reqId:string,res:Response){
        const law:Law= await this.lawRepository.findOneBy({
            id: lawId,
        });
        if (!law) {
            res.status(400).send({ message: "Lw doesn't exist" });
        }
        const lawModificationRequest = await this.lawModificationRepository.findOneBy({
            id:reqId
        })
        if (!lawModificationRequest) {
            res.status(400).send({ message: "Modification Request doesn't exist" });
        }
        const lawInDb= await this.lawRepository.save({
            ...law,
            title: lawModificationRequest.description,
            upvotes:0,
            downvotes:0
        })
        await this.lawModificationRepository.delete({id:reqId});
        return res.status(200).send(lawInDb);
    }
}
