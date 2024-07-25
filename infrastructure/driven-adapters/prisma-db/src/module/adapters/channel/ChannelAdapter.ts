import Channel from "../../../../../../../entities/src/module/entities/channel/Channel";
import IChannelRepository from "../../../../../../../entities/src/module/entities/channel/gateway/IChannelRepository";
import {Injectable} from "@nestjs/common";
import PrismaService from "../../config/PrismaService";
import {exceptionHandler} from "../../../../../../../entities/src/module/common/exception/util/ExceptionUtil";
import {ChannelTechnicalMessage as TechnicalMessage} from "../../../../../../../entities/src/module/entities/channel/message/ChannelTechnicalMessage";
import ChannelMapper from "./mappers/ChannelMapper";
import ChannelData from "./data/ChannelData";

@Injectable()
export default class ChannelAdapter implements IChannelRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findByName(name: string): Promise<Channel> {
        try {
            const channelDb = await this.prismaService.channel.findUnique({where: {name: name}});
            return channelDb ? ChannelMapper.toModel(channelDb) : null;
        } catch (exception) {
            exceptionHandler(TechnicalMessage.MST_CHANNEL_000, exception);
        }
    }

    async findByAcronym(acronym: string): Promise<Channel> {
        try {
            const channelDb = await this.prismaService.channel.findUnique({where: {acronym: acronym}});
            return channelDb ? ChannelMapper.toModel(channelDb) : null;
        } catch (exception) {
            exceptionHandler(TechnicalMessage.MST_CHANNEL_000, exception);
        }
    }

    async list(): Promise<Channel[]> {
        try {
            const channelList = await this.prismaService.channel.findMany();
            return channelList ? ChannelMapper.toListModel(channelList) : null;
        } catch (exception) {
            exceptionHandler(TechnicalMessage.MST_CHANNEL_000, exception);
        }
    }

    async save(channel: Channel): Promise<Channel> {
        try {
            const newChannel = await this.prismaService.channel.create({data: new ChannelData(channel)});
            return ChannelMapper.toModel(newChannel);
        } catch (exception) {
            exceptionHandler(TechnicalMessage.MST_CHANNEL_000, exception);
        }
    }
}
