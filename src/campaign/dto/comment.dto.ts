import { Exclude } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export default class CommentDto{
    @Exclude()
    id:string;

    @IsString()
    @IsNotEmpty()
    comment:string;


    userEmail:string;

    @Exclude()
    createdAt:Date;
}