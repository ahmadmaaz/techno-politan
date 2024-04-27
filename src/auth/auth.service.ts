import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign, verify } from 'jsonwebtoken';
import { Repository, QueryFailedError } from 'typeorm';
import { Request, Response } from 'express';
import * as bcryptjs from 'bcryptjs';
import { User } from 'src/auth/entity/user.entity';
import { CitizenDto } from './dto/citizen.dto';
import MPDto from './dto/mp.dto';
import PCDto from './dto/pc.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
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
    const userInDb = await this.userRepository.save({
        ...user,
        password: await bcryptjs.hash(user.password, 12),
    });
    return resp.status(200).send(user);
  }

  async loginUser(user: User, resp: Response) {
    const { email, password } = user;

    // check for required fields
    if (!email?.trim() || !password?.trim()) {
      return resp
        .status(500)
        .send({ message: 'Not all required fields have been filled in.' });
    }

    const userDB = await this.userRepository.findOne({ where: { email } });

    // user not found or wrong password
    if (!userDB || !(await bcryptjs.compare(password, userDB.password))) {
      return resp.status(500).send({ message: 'Invalid Credentials.' });
    }

    const accessToken = sign({ id: userDB.id }, 'access_secret', {
      expiresIn: 60 * 60,
    });

    const refreshToken = sign({ id: userDB.id }, 'refresh_secret', {
      expiresIn: 24 * 60 * 60,
    });

    resp.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    resp.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    resp.status(200).send({ message: 'Login success.' });
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
