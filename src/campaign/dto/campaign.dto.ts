import { Exclude } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export default class CampaignDTO{
    id: number;

    @IsNotEmpty()
    goals: string[];

    @IsNotEmpty()
    candidateNames: string[];

    @IsNotEmpty()
    @IsString()
    district:string;

    @IsNotEmpty()
    @IsString()
    politicalDependecy:string;

    @IsNotEmpty()
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
} 