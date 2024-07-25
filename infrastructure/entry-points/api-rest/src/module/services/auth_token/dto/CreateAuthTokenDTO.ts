import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, MaxLength, MinLength} from "class-validator";

export default class CreateAuthTokenDTO {

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @MinLength(3, {message: "The acronym channel must be a minimum of 3 characters."})
    @MaxLength(5, {message: "The acronym channel must be a maximum of 5 characters."})
    channel: string;

    @ApiProperty({ required: true, description: "The secret key must be base 64 encoded." })
    @IsNotEmpty()
    @MinLength(64, {message: "The secret key must be a minimum of 64 characters."})
    secretKey: string;

    constructor() {}
    
}
