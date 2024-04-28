import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { User } from './entity/user.entity';
import PCDto from './dto/pc.dto';
import { CitizenDto } from './dto/citizen.dto';
import MPDto from './dto/mp.dto';
import { UserDto } from './dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}


    @Post("/signup/pc")
    signUpPc(@Body() dto:PCDto, @Res() res:Response){
        return this.authService.signUpPc(dto, res);

    }
    @Post("/signup/citizen")
    signUpCitizen(@Body() dto:CitizenDto, @Res() res:Response){
        return this.authService.signUpCitizen(dto, res);
    }
    @Post("/signup/mp")
    signUpMp(@Body() dto:MPDto, @Res() res:Response){
        return this.authService.signUpMp(dto, res);
    }


  
    @Post('/login')
    loginUser(@Body() user: Pick<UserDto, 'email' | 'password'>, @Res() res: Response) {
      return this.authService.loginUser(user, res);
    }
  
    @Get('/user')
    authUser(@Req() req: Request, @Res() resp: Response) {
      return this.authService.authUser(req, resp);
    }
  
    @Post('/refresh')
    refreshUser(@Req() req: Request, @Res() resp: Response) {
      return this.authService.refreshUser(req, resp);
    }
  
    @Get('/logout')
    logoutUser(@Res() resp: Response) {
      return this.authService.logoutUser(resp);
    }
}
