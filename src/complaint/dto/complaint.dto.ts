import { Exclude } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export default class ComplaintDTO{

    @Exclude()
    id:string;

    @IsString()
    @IsNotEmpty()
    content:string;

    @Exclude()
    publisher:string;

    @IsString()
    @IsNotEmpty()
    govOrgName: number;


    @Exclude()
    upvotes:number;

    @Exclude()
    downvotes:number;

    @Exclude()
    createdAt: Date;
}