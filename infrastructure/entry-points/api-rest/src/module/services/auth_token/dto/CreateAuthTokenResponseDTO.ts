import {ApiProperty} from "@nestjs/swagger";
import AuthToken from "entities/src/module/entities/auth_token/AuthToken";

export default class CreateAuthTokenResponseDTO {
    
    @ApiProperty({ required: true })
    token: string;

    @ApiProperty({ required: true })
    duration: string;

    constructor(authToken: AuthToken) {
        this.token = authToken.getToken();
        this.duration = authToken.getDuration();
    }
}
