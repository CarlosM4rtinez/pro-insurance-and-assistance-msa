import {ApiProperty} from "@nestjs/swagger";

export default class ValidateAuthTokenResponseDTO {
    
    @ApiProperty({ required: true })
    message: string;

    @ApiProperty({ required: true })
    date: Date;

    constructor(message: string) {
        this.message = message;
        this.date = new Date();
    }
}
