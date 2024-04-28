import { Exclude } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export default class LawDTO{
    @Exclude()
    id:string;

    @IsString()
    @IsNotEmpty()
    title:string;

    @IsString()
    @IsNotEmpty()
    field:string;

    @Exclude()
    upvotes:number;

    @Exclude()
    downvotes:number;

    @Exclude()
    parliamentMemberName:string;

    @Exclude()
    createdAt: Date;
}