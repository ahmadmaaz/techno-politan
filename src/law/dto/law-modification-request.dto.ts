import { Exclude } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export default class LawModificationRequestDTO{
    @Exclude()
    id: string;

    @IsNotEmpty()
    @IsString()
    description:string;

    @Exclude()
    lawId:string;

    @Exclude()
    lawTitle:string;

    @Exclude()
    userEmail:string;

    @Exclude()
    createdAt: Date;
}