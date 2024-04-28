import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign, verify } from 'jsonwebtoken';
import { Repository, QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';
import * as bcryptjs from 'bcryptjs';
import { User } from './entity/user.entity';
import { CitizenDto } from './dto/citizen.dto';
import MPDto from './dto/mp.dto';
import PCDto from './dto/pc.dto';
import { UserDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async signUpPc(dto: PCDto, res: Response) {
    const user:User = {
        ...dto,
        pc:{
            campaignName: dto.campaignName,
            studyField: dto.studyField,
            politicalParty: dto.politicalParty,
            biography: dto.biography
        }
    }
    return await this.registerUser(user, res);
  }
  async signUpCitizen(dto: CitizenDto, res: Response) {
    const user:User = {
        ...dto,
        citizen:{
            occupation: dto.occupation,
            placeOfBirth: dto.placeOfBirth
        }
    }
    return await this.registerUser(user, res);
  }
  async signUpMp(dto: MPDto, res: Response) {
    const user:User = {
        ...dto,
        mp:{
            position: dto.position,
            startDate: dto.startDate,
            endDate: dto.endDate,
            relatedParty: dto.relatedParty,
            biography: dto.biography
        }
    }
    return await this.registerUser(user, res);
  }
  async registerUser(user: User, resp: Response) {
    delete user.id;
    delete user.createdAt;
    const userInDb = await this.userRepository.save({
        ...user,
        password: await bcryptjs.hash(user.password, 12),
    });
    return resp.status(200).send(user);
  }

  async loginUser(user: Pick<UserDto, 'email' | 'password'>, resp: Response) {
    const { email, password } = user;


    const userDB = await this.userRepository.findOne({ where: { email } ,relations: ['admin', 'pc', 'mp', 'citizen']});
    console.log(userDB)
    if (!userDB || !(await bcryptjs.compare(password, userDB.password))) {
      return resp.status(401).send({ message: 'Invalid Credentials.' });
    }
    let role:string="admin";
    if(userDB.citizen){
        role="citizen";
    }else if (userDB.pc){
        role="pc";
    }else if(userDB.mp){
        role="mp";
    }
    const accessToken = await this.jwtService.signAsync({id:userDB.id,email:userDB.email,role:role}) 



    resp.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });


    resp.status(200).send();
  }

  // AUTH USER
  async authUser(req: Request, resp: Response) {
    try {
      const accessToken = req.cookies['accessToken'];

      const payload: any = verify(accessToken, 'access_secret');

      if (!payload) {
        return resp.status(401).send({ message: 'Unauthenticated.' });
      }

      const user = await this.userRepository.findOne({
        where: { id: payload.id },
      });

      if (!user) {
        return resp.status(401).send({ message: 'Unauthenticated.' });
      }

      return resp.status(200).send(user);
    } catch (error) {
      console.error(error);
      return resp.status(500).send({ message: error });
    }
  }

  async refreshUser(req: Request, resp: Response) {
    try {
      const refreshToken = req.cookies['refreshToken'];

      const payload: any = verify(refreshToken, 'refresh_secret');

      if (!payload) {
        return resp.status(401).send({ message: 'Unauthenticated.' });
      }

      const accessToken = sign({ id: payload.id }, 'access_secret', {
        expiresIn: 60 * 60,
      });

      resp.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      resp.status(200).send({ message: 'refresh success.' });
    } catch (error) {
      console.error(error);
      return resp.status(500).send({ message: error });
    }
  }

  async logoutUser(resp: Response) {
    resp.cookie('accessToken', '', { maxAge: 0 });
    resp.cookie('refreshToken', '', { maxAge: 0 });

    return resp.status(200).send({ message: 'logged out.' });
  }
}
