import { Body, Controller, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import CampaignDTO from './dto/campaign.dto';
import { Response } from 'express';
import { Roles } from '../auth/roles/roles.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';
import CommentDto from './dto/comment.dto';

@Controller('campaign')
export class CampaignController {
    constructor(private readonly campaignService: CampaignService) {}

    @Roles("pc")
    @UseGuards(AuthGuard,RoleGuard)
    @Post()
    createCampaign(@Body() dto:CampaignDTO, @Res() res:Response){
        return this.campaignService.createCampaign(dto,res);
    }

    @Roles("pc")
    @UseGuards(AuthGuard,RoleGuard)
    @Put("/archive/:id")
    archiveCampaign(@Param('id') id: string, @Res() res:Response){
        return this.campaignService.archiveCampaign(id,res);
    }

    @UseGuards(AuthGuard)
    @Put("/upvote/:id")
    upvoteCampaign(@Param('id') id: string,@Res() res:Response){
        return this.campaignService.voteCampaign(id,true,res);
    }

    @UseGuards(AuthGuard)
    @Put("/downvote/:id")
    downvoteCampaign(@Param('id') id: string,@Res() res:Response){
        return this.campaignService.voteCampaign(id,false,res);
    }


    @UseGuards(AuthGuard)
    @Get()
    findAll(@Res() res:Response){
        return this.campaignService.findAll(res);
    }

    @UseGuards(AuthGuard)
    @Get("/archive")
    findAllArchive(@Res() res:Response){
        return this.campaignService.findAllArchive(res);
    }

    @UseGuards(AuthGuard)
    @Post("/comment/:id")
    createComment(@Param("id") id: string, @Body() dto:CommentDto,@Res() res:Response,@Req() req: Request){
        return this.campaignService.createComment(id,dto,req["user"],res);
    }

    @Get("/comment/:id")
    findCommentsByCampaign(@Param("id") id: string, @Res() res:Response){
        return this.campaignService.findCommentsByCampaign(id,res);
    }
}
