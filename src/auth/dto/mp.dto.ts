import { IsDate, IsDateString, IsNotEmpty } from "class-validator";
import { UserDto } from "./user.dto"
import { Transform } from "class-transformer";

export default class MPDto extends UserDto{
    @IsNotEmpty()
    position!:string;

    @Transform( ({ value }) => new Date(value))
    @IsDate()
    startDate!:Date;

    @Transform( ({ value }) => new Date(value))
    @IsDate()
    endDate!:Date;

    @IsNotEmpty()
    relatedParty!:string;

    @IsNotEmpty()
    biography!:string;
}