import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Citizen } from './auth/entity/citizen.entity';
import { MP } from './auth/entity/mp.entity';
import { PC } from './auth/entity/pc.entity';
import { Admin } from './auth/entity/admin.entity';
import { User } from './auth/entity/user.entity';
import { AuthModule } from './auth/auth.module';
import { CampaignModule } from './campaign/campaign.module';
import { LawModule } from './law/law.module';
import { ComplaintModule } from './complaint/complaint.module';
import Campaign from './campaign/entity/campaign.entity';
import Comment from './campaign/entity/comment.entity';
import Law from './law/entity/law.entity';
import LawModificationRequest from './law/entity/law-modification-request';
@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port:5432,
      username: 'postgres',
      password: 'DC8E6A353Mmaaz',
      database: 'technoPolitan',
      entities: [Citizen,Admin,MP,PC,User,Campaign,Comment,Law,LawModificationRequest],
      synchronize: true,
    }),
    AuthModule,
    CampaignModule,
    LawModule,
    ComplaintModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
