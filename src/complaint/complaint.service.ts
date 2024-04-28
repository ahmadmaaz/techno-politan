import { Injectable } from '@nestjs/common';
import Complaint from './entity/complaint.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';
import { Repository } from 'typeorm';
import ComplaintDTO from './dto/complaint.dto';
import { Response } from 'express';
import { plainToClass } from 'class-transformer';
import Comment from 'src/campaign/entity/comment.entity';

@Injectable()
export class ComplaintService {

    constructor(
        @InjectRepository(Complaint)
        private complaintRepository: Repository<Complaint>,
        @InjectRepository(Comment) private commentRepository: Repository<Comment>,
        @InjectRepository(User) private userRepository: Repository<User>,
      ) {}

    async publishComplaint(dto:ComplaintDTO, user:User,res: Response){
        const userInDb =await  this.userRepository.findOneBy({
            email:user.email
        })
        const complaint :Complaint =plainToClass(Complaint, dto);
        return res.status(200).send(await this.complaintRepository.save({
            ...complaint,
            publisher: userInDb.firstName + " " + userInDb.lastName
        }));
    }
}
