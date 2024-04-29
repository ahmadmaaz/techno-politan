import { Module } from '@nestjs/common';
import { ComplaintController } from './complaint.controller';
import { ComplaintService } from './complaint.service';
import Comment from '../campaign/entity/comment.entity';
import Complaint from './entity/complaint.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Complaint, Comment, User])],
  controllers: [ComplaintController],
  providers: [ComplaintService],
})
export class ComplaintModule {}
