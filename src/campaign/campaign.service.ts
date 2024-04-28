import { Injectable } from '@nestjs/common';
import CampaignDTO from './dto/campaign.dto';
import { plainToClass } from 'class-transformer';
import Campaign from './entity/campaign.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'express';
import CommentDto from './dto/comment.dto';
import { User } from '../auth/entity/user.entity';
import Comment from './entity/comment.entity';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private campaignRepository: Repository<Campaign>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async createCampaign(dto: CampaignDTO, res: Response) {
    const entity = plainToClass(Campaign, dto);
    const campaign = await this.campaignRepository.save(entity);
    return res.status(200).send(campaign);
  }

  async voteCampaign(id: string, isUpvote: boolean, res: Response) {
    const campaign = await this.campaignRepository.findOneBy({
      id: id,
    });
    if (!campaign) {
      // campaign does not exist
      res.status(400).send({ message: "Campaign doesn't exist" });
    }
    if (campaign.isPoliticalArchive) {
      res.status(400).send({ message: 'Campaign is political archive' });
    }
    if (isUpvote) campaign.upvotes++;
    else campaign.downvotes++;
    const campaignInDb = await this.campaignRepository.save(campaign);
    return res.status(200).send(campaignInDb);
  }

  async findAll(res: Response) {
    const campaigns: Campaign[] = await this.campaignRepository.find();
    return res.status(200).send(campaigns);
  }
  async findAllArchive(res: Response) {
    const campaigns: Campaign[] = await this.campaignRepository.find({
      where: {
        isPoliticalArchive: true,
      },
    });
    return res.status(200).send(campaigns);
  }
  async createComment(id: string, dto: CommentDto, user: User, res: Response) {
    const campaign = await this.campaignRepository.findOneBy({
      id: id,
    });
    if (!campaign) {
      // campaign does not exist
      res.status(400).send({ message: "Campaign doesn't exist" });
    }
    const userInDb = await this.userRepository.findOneBy({
      id: user.id,
    });
    return res.status(200).send(
      await this.commentRepository.save({
        comment: dto.comment,
        campaign: campaign,
        user: userInDb,
      }),
    );
  }
  async findCommentsByCampaign(id: string, res: Response) {
    const campaign = await this.campaignRepository.findOneBy({
      id: id,
    });
    if (!campaign) {
      // campaign does not exist
      res.status(400).send({ message: "Campaign doesn't exist" });
    }
    return res.status(200).send(
      await this.commentRepository.find({
        where: {
          campaign: campaign,
        },
      }),
    );
  }
}
