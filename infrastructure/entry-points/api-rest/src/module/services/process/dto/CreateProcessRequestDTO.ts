import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, MaxLength, MinLength } from "class-validator";

export default class CreateProcessRequestDTO {

    @IsOptional()
    @MinLength(5, {message: "The curp customer must be a minimum of 5 characters."})
    @MaxLength(30, {message: "The curp customer must be a maximum of 30 characters."})
    @ApiProperty({ required: false, description: "Customer curp who initiates the process." })
    curp: string;

    @IsOptional()
    @MinLength(5, {message: "The RFC customer must be a minimum of 5 characters."})
    @MaxLength(40, {message: "The RFC customer must be a maximum of 40 characters."})
    @ApiProperty({ required: false, description: "Customer RFC who initiates the process." })
    rfc: string;

}