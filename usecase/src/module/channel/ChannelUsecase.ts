import IChannelRepository from "../../../../entities/src/module/entities/channel/gateway/IChannelRepository";
import {Inject, Injectable} from "@nestjs/common";
import Channel from "../../../../entities/src/module/entities/channel/Channel";
import {checkAndThrowBusinessException} from "../../../../entities/src/module/common/exception/util/ExceptionUtil";
import {ChannelBusinessMessage as businessMessage} from "../../../../entities/src/module/entities/channel/message/ChannelBusinessMessage";
import {isEmpty} from "../../../../entities/src/module/common/services/ValidatorService";
import IEncryptorUtil from "../../../../entities/src/module/common/services/IEncryptorService";

@Injectable()
export default class ChannelUsecase {
    
    constructor(@Inject("IChannelRepository") private readonly channelRepository: IChannelRepository, @Inject("IEncryptorUtil") private readonly encryptorUtil: IEncryptorUtil) {}

    async findByAcronym(acronym: string): Promise<Channel> {
        const channel = await this.channelRepository.findByAcronym(acronym);
        checkAndThrowBusinessException(!channel, businessMessage.MSB_CHANNEL_000);
        return channel;
    }

    async list(): Promise<Channel[]> {
        return await this.channelRepository.list();
    }

    async create(name: string, acronym: string, secretKey: string): Promise<Channel> {
        const [channelByName, channelByAcronym] = await Promise.all([this.channelRepository.findByName(name), this.channelRepository.findByAcronym(acronym)]);
        checkAndThrowBusinessException(!isEmpty(channelByName), businessMessage.MSB_CHANNEL_001);
        checkAndThrowBusinessException(!isEmpty(channelByAcronym), businessMessage.MSB_CHANNEL_002);
        const encryptedSecretKey = await this.encryptorUtil.encrypt(secretKey);
        const channel = new Channel(name, acronym, encryptedSecretKey);
        return await this.channelRepository.save(channel);
    }
}
