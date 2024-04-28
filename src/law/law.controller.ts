import { Body, Controller, Get, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { LawService } from './law.service';
import LawDTO from './dto/law.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { User } from 'src/auth/user.decorator';
import { Response } from 'express';
import LawModificationRequestDTO from './dto/law-modification-request.dto';

@Controller('law')
export class LawController {

    constructor(private readonly lawService: LawService) {}


    @Roles("mp")
    @UseGuards(AuthGuard,RoleGuard)
    @Post()
    proposeLaw(@Body() dto:LawDTO, @Res() res:Response,@User() user){
        return this.lawService.proposeLaw(dto,user,res);
    }

    @Roles("mp")
    @UseGuards(AuthGuard,RoleGuard)
    @Put("/:id")
    updateLaw(@Param("id") id: string,@Body() dto:LawDTO, @Res() res:Response){
        return this.lawService.updateLaw(id,dto,res);
    }

    @Get()
    findAll(@Res() res:Response){
        return this.lawService.findAll(res);
    }

    @UseGuards(AuthGuard)
    @Post("/upvote/:id")
    upvoteCampaign(@Param('id') id: string,@Res() res:Response){
        return this.lawService.voteLaw(id,true,res);
    }

    @UseGuards(AuthGuard)
    @Post("/downvote/:id")
    downvoteCampaign(@Param('id') id: string,@Res() res:Response){
        return this.lawService.voteLaw(id,false,res);
    }

    @UseGuards(AuthGuard)
    @Post("/:id/modification-request")
    requestModification(@Param('id') id: string,@Body() dto:LawModificationRequestDTO,@User() user,@Res() res:Response){
        return this.lawService.requestModification(dto,id,user,res);
    }
    @UseGuards(AuthGuard)
    @Post("/:id/modification-request/:reqId/approve")
    approveReqModification(@Param('id') lawId: string,@Param("reqId") reqId:string, @Res() res:Response){
        return this.lawService.approveReqModification(lawId,reqId,res);
    }
}
