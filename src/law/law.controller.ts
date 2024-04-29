import { Body, Controller, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { LawService } from './law.service';
import LawDTO from './dto/law.dto';
import { AuthGuard } from '../auth/auth.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { Request, Response } from 'express';
import LawModificationRequestDTO from './dto/law-modification-request.dto';

@Controller('law')
export class LawController {

    constructor(private readonly lawService: LawService) {}


    @Roles("mp")
    @UseGuards(AuthGuard,RoleGuard)
    @Post()
    proposeLaw(@Body() dto:LawDTO, @Res() res:Response,@Req() req: Request){
        return this.lawService.proposeLaw(dto,req['user'],res);
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
    @Put("/upvote/:id")
    upvoteLaw(@Param('id') id: string,@Res() res:Response){
        return this.lawService.voteLaw(id,true,res);
    }

    @UseGuards(AuthGuard)
    @Put("/downvote/:id")
    downvoteLaw(@Param('id') id: string,@Res() res:Response){
        return this.lawService.voteLaw(id,false,res);
    }

    @UseGuards(AuthGuard)
    @Post("/:id/modification-request")
    requestModification(@Param('id') id: string,@Body() dto:LawModificationRequestDTO,@Req() req: Request,@Res() res:Response){
        return this.lawService.requestModification(dto,id,req['user'],res);
    }

    @Roles("mp")
    @UseGuards(AuthGuard,RoleGuard)
    @Post("/:id/modification-request/:reqId/approve")
    approveReqModification(@Param('id') lawId: string,@Param("reqId") reqId:string, @Res() res:Response){
        return this.lawService.approveReqModification(lawId,reqId,res);
    }
}
