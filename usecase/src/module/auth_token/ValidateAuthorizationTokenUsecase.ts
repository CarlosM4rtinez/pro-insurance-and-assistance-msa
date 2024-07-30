import IAuthTokenGateway from "../../../../entities/src/module/entities/auth_token/gateway/IAuthTokenGateway";
import IChannelRepository from "../../../../entities/src/module/entities/channel/gateway/IChannelRepository";
import {checkAndThrowBusinessException} from "../../../../entities/src/module/common/exception/util/ExceptionUtil";
import {AuthTokenBusinessMessage as BusinessMessage} from "../../../../entities/src/module/entities/auth_token/message/AuthTokenBusinessMessage";
import {Inject, Injectable} from "@nestjs/common";

@Injectable()
export default class ValidateAuthorizationTokenUsecase {
    constructor(
        @Inject("IAuthTokenGateway") private readonly authTokenGateway: IAuthTokenGateway,
        @Inject("IChannelRepository") private readonly channelRepository: IChannelRepository,
    ) {}

    async execute(authToken: string): Promise<void> {
        const isTokenExpired = this.authTokenGateway.isTokenExpired(authToken);
        checkAndThrowBusinessException(isTokenExpired, BusinessMessage.MSB_AUTH_TOKEN_002);
        const channelFromToken = this.authTokenGateway.getPayloadFromToken(authToken);
        const channel = await this.channelRepository.findByAcronym(channelFromToken.getAcronym());
        const tokenIsAuthentic = this.authTokenGateway.validateAuthorizationToken(authToken, channel.getSecretKey());
        checkAndThrowBusinessException(!tokenIsAuthentic, BusinessMessage.MSB_AUTH_TOKEN_003);
    }
}
