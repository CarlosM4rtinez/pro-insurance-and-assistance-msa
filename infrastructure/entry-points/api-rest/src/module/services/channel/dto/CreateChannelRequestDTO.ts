import {MaxLength, IsNotEmpty, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export default class CreateChannelRequestDTO {
    
    @IsNotEmpty()
    @MinLength(5, {message: "The name channel must be a minimum of 5 characters."})
    @MaxLength(50, {message: "The name channel must be a maximum of 50 characters."})
    @ApiProperty({ required: true })
    name: string;

    @IsNotEmpty()
    @MinLength(3, {message: "The acronym channel must be a minimum of 3 characters."})
    @MaxLength(5, {message: "The acronym channel must be a maximum of 5 characters."})
    @ApiProperty({ required: true })
    acronym: string;

    @IsNotEmpty()
    @MinLength(64, {message: "The secret key must be a minimum of 64 characters."})
    @ApiProperty({ required: true, description: "The secret key must be base 64 encoded." })
    secretKey: string;
}
