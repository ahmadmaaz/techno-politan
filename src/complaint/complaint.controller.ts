import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ComplaintService } from './complaint.service';
import ComplaintDTO from './dto/complaint.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Request, Response } from 'express';

@Controller('complaint')
export class ComplaintController {

    constructor(private readonly complaintService: ComplaintService) {}

    @UseGuards(AuthGuard)
    @Post()
    publishComplaint(@Body() dto:ComplaintDTO,@Req() req:Request, @Res() res:Response){
        return this.complaintService.publishComplaint(dto,req['user'],res);
    }


}
