import { IsNotEmpty } from "class-validator";
import { UserDto } from "./user.dto";

export default class PCDto extends UserDto{
    @IsNotEmpty()
    campaignName!:string;

    @IsNotEmpty()
    studyField!:string;

    @IsNotEmpty()
    politicalParty!:string;

    @IsNotEmpty()
    biography!:string;
}