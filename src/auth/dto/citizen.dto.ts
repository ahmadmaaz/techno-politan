import { IsNotEmpty } from "class-validator";
import { User } from "../entity/user.entity";
import { UserDto } from "./user.dto";

export class CitizenDto extends UserDto{
    @IsNotEmpty()
    occupation!:string;

    @IsNotEmpty()
    placeOfBirth!:string;

}