import { Exclude } from "class-transformer";
import { ArrayMinSize, IsArray, IsIn, IsNotEmpty, IsString, Min, MinLength } from "class-validator";

export default class CampaignDTO{
    @Exclude()
    id?: number;

    @IsArray()
    @ArrayMinSize(1)
    goals: string[];

    @IsArray()
    @ArrayMinSize(1)
    candidateNames: string[];

    @IsNotEmpty()
    @IsString()
    @IsIn(["Beirut","Mount Lebanon","Aley","Baabda"])  // For testing purposes we will keep only 4 districts
    district:string;

    @IsNotEmpty()
    @IsString()
    politicalDependecy:string;

    @IsNotEmpty()
    @Min(2024)
    year: number;

    @IsNotEmpty()
    @IsString()
    description:string;

    @Exclude()
    upvotes:number;

    @Exclude()
    downvotes:number;

    @Exclude()
    campaignOutcome:number;

    @Exclude()
    isPoliticalArchive:boolean;

    @Exclude()
    createdAt?:Date;
} 