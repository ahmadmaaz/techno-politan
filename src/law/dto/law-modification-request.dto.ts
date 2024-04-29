import { Exclude } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import LawDTO from "./law.dto";
import { User } from "../../auth/entity/user.entity";

export default class LawModificationRequestDTO{
    @Exclude()
    id: string;

    @IsNotEmpty()
    @IsString()
    description:string;

    @Exclude()
    law:LawDTO

    @Exclude()
    user:User;

    @Exclude()
    createdAt: Date;
}