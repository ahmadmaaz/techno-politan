import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Citizen } from './entity/citizen.entity';
import { MP } from './entity/mp.entity';
import { PC } from './entity/pc.entity';
import { User } from './entity/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Admin } from './entity/admin.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([Citizen,Admin,MP,PC,User]),
        JwtModule.register({
            global: true,
            secret: "TOP SECRET CODE OUF HEHEH",
            signOptions: { expiresIn: '1d' },
          }),
    ],
    controllers: [ AuthController],
    providers: [AuthService],
})
export class AuthModule {}
