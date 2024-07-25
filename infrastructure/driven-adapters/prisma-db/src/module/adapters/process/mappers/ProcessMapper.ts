import {exceptionHandler} from "../../../../../../../../entities/src/module/common/exception/util/ExceptionUtil";
import {ProcessTechnicalMessage as TechnicalMessage} from "../../../../../../../../entities/src/module/entities/process/message/ProcessTechnicalMessage";
import {Process as PrismaProcess} from "@prisma/client";
import Channel from "../../../../../../../../entities/src/module/entities/channel/Channel";
import Process from "../../../../../../../../entities/src/module/entities/process/Process";
import ChannelMapper from "../../channel/mappers/ChannelMapper";

export default class ProcessMapper {

    private constructor() {
        exceptionHandler(TechnicalMessage.MST_PROCESS_001, TechnicalMessage.MST_PROCESS_001.message);
    }

    public static toModel(prismaProcess: PrismaProcess): Process {
        const channel: Channel = ChannelMapper.toModel(prismaProcess["channelData"]);
        return new Process(prismaProcess.id, prismaProcess.key, prismaProcess.duration, prismaProcess.createdAt, prismaProcess.updatedAt, channel, prismaProcess.customer);
    }

    public static toListModel(prismaList: PrismaProcess[]): Process[] {
        return prismaList.map((prismaProcess) => this.toModel(prismaProcess));
    }
    
}
