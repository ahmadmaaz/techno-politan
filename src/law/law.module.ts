import { Module } from '@nestjs/common';
import { LawController } from './law.controller';
import { LawService } from './law.service';
import Law from './entity/law.entity';
import LawModificationRequest from './entity/law-modification-request';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entity/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Law,LawModificationRequest,User]),
  ],
  controllers: [LawController],
  providers: [LawService]
})
export class LawModule {}
