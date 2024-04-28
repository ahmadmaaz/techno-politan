import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Citizen } from './entity/citizen.entity';
import { MP } from './entity/mp.entity';
import { PC } from './entity/pc.entity';
import { User } from './entity/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Admin } from './entity/admin.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Citizen,Admin,MP,PC,User]),
    ],
    controllers: [ AuthController],
    providers: [AuthService],
})
export class AuthModule {}
