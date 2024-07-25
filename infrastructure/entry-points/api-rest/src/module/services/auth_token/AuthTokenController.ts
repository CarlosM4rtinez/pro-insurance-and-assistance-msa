import {Body, Controller, Get, Headers, Post} from "@nestjs/common";
import CreateAuthorizationTokenUsecase from "../../../../../../../usecase/src/module/auth_token/CreateAuthorizationTokenUsecase";
import {ApiConflictResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import ErrorDTO from "../../commons/dto/ErrorDTO";
import CreateAuthTokenDTO from "./dto/CreateAuthTokenDTO";
import CreateAuthTokenResponseDTO from "./dto/CreateAuthTokenResponseDTO";
import ValidateAuthorizationTokenUsecase from "../../../../../../../usecase/src/module/auth_token/ValidateAuthorizationTokenUsecase";
import ValidateAuthTokenResponseDTO from "./dto/ValidateAuthTokenResponseDTO";
import { extractAuthTokenWithValidation } from "../../commons/util/RequestUtil";

@ApiTags("Authorization Token")
@Controller("/api/v1/channel/auth-token")
export default class AuthTokenController {

    constructor(
        private readonly createTokenUsecase: CreateAuthorizationTokenUsecase, 
        private readonly validateTokenUsecase: ValidateAuthorizationTokenUsecase
    ) {}

    @Post()
    @ApiOperation({summary: "Create authorization token.", description: "Create authorization token."})
    @ApiOkResponse({description: "Authorization token successfully created.", type: CreateAuthTokenResponseDTO})
    @ApiConflictResponse({description: "A business exception has occurred.", type: ErrorDTO})
    @ApiInternalServerErrorResponse({description: "A technical exception has occurred.", type: ErrorDTO})
    async create(@Body() request: CreateAuthTokenDTO) {
        const secretKeyDecoded = Buffer.from(request.secretKey, 'base64').toString('utf-8');
        const authToken = await this.createTokenUsecase.execute(request.channel, secretKeyDecoded);
        return new CreateAuthTokenResponseDTO(authToken);
    }

    @Get()
    @ApiOperation({summary: "Validate authorization token.", description: "Validate authorization token."})
    @ApiOkResponse({description: "Authorization token validation was successful.", type: ValidateAuthTokenResponseDTO})
    @ApiConflictResponse({description: "A business exception has occurred.", type: ErrorDTO})
    @ApiInternalServerErrorResponse({description: "A technical exception has occurred.", type: ErrorDTO})
    async validate(@Headers("authorization") authorizationHeader: string) {
        const authToken = extractAuthTokenWithValidation(authorizationHeader);
        await this.validateTokenUsecase.execute(authToken);
        return new ValidateAuthTokenResponseDTO("The authorization token is valid.");
    }
    
}
