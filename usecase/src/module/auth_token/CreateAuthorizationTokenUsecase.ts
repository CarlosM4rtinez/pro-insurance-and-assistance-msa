import IAuthTokenGateway from "../../../../entities/src/module/entities/auth_token/gateway/IAuthTokenGateway";
import AuthToken from "../../../../entities/src/module/entities/auth_token/AuthToken";
import IChannelRepository from "../../../../entities/src/module/entities/channel/gateway/IChannelRepository";
import {checkAndThrowBusinessException} from "../../../../entities/src/module/common/exception/util/ExceptionUtil";
import {AuthTokenBusinessMessage as BusinessMessage} from "../../../../entities/src/module/entities/auth_token/message/AuthTokenBusinessMessage";
import {Inject, Injectable} from "@nestjs/common";
import IEncryptorUtil from "../../../../entities/src/module/common/services/IEncryptorService";
import Channel from "../../../../entities/src/module/entities/channel/Channel";

@Injectable()
export default class CreateAuthorizationTokenUsecase {
    constructor(
        @Inject("IAuthTokenGateway") private readonly authTokenGateway: IAuthTokenGateway,
        @Inject("IChannelRepository") private readonly channelRepository: IChannelRepository,
        @Inject("IEncryptorUtil") private readonly encryptorUtil: IEncryptorUtil
    ) {}

    async execute(channelAcronym: string, secretKeyChannel: string): Promise<AuthToken> {
        const channel = await this.checkChannel(channelAcronym, secretKeyChannel);
        return this.authTokenGateway.createAuthorizationToken(channel, channel.getSecretKey());
    }

    async checkChannel(channelAcronym: string, secretKeyChannel: string): Promise<Channel> {
        const channel = await this.channelRepository.findByAcronym(channelAcronym);
        checkAndThrowBusinessException(!channel, BusinessMessage.MSB_AUTH_TOKEN_000)
        const match = await this.encryptorUtil.compare(secretKeyChannel, channel.getSecretKey());
        checkAndThrowBusinessException(!match, BusinessMessage.MSB_AUTH_TOKEN_001);
        return channel;
    }
}
