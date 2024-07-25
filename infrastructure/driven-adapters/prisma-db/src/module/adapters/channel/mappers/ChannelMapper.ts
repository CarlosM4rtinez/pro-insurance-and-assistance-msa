import {exceptionHandler} from "../../../../../../../../entities/src/module/common/exception/util/ExceptionUtil";
import {ChannelTechnicalMessage as TechnicalMessage} from "../../../../../../../../entities/src/module/entities/channel/message/ChannelTechnicalMessage";
import {Channel as PrismaChannel} from "@prisma/client";
import Channel from "../../../../../../../../entities/src/module/entities/channel/Channel";

export default class ChannelMapper {

    private constructor() {
        exceptionHandler(TechnicalMessage.MST_CHANNEL_001, TechnicalMessage.MST_CHANNEL_001.message);
    }

    public static toModel(prismaChannel: any): Channel {
        return new Channel(prismaChannel.name, prismaChannel.acronym, prismaChannel.secretKey, prismaChannel.id, prismaChannel.createdAt, prismaChannel.updatedAt);
    }

    public static toListModel(prismaChannelList: PrismaChannel[]): Channel[] {
        return prismaChannelList.map((prismaChannel) => this.toModel(prismaChannel));
    }
}
