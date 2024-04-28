import { Module } from '@nestjs/common';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import Campaign from './entity/campaign.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Comment from './entity/comment.entity';
import { User } from '../auth/entity/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Campaign,Comment,User]),
  ],
  controllers: [CampaignController],
  providers: [CampaignService]
})
export class CampaignModule {}
