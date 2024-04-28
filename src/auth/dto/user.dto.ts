import { Transform } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber, IsStrongPassword } from "class-validator";

export class UserDto{

    
    
    id: number;

    @IsNotEmpty()
    firstName!: string;

    @IsNotEmpty()
    middleName!: string;

    @IsNotEmpty()
    lastName!: string;
    
    @IsPhoneNumber()
    phoneNumber!:string;

    @IsEmail()
    email!:string;

    @Transform( ({ value }) => new Date(value))
    @IsDate()
    dob:Date;

    @IsNotEmpty()
    education!:string;

    @IsNotEmpty()
    contactInformation!:string;

    @IsStrongPassword()
    @IsNotEmpty()
    password!: string;

    createdAt: Date;
}