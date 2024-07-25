import {Module} from "@nestjs/common";
import PrismaService from "./config/PrismaService";
import ChannelAdapter from "./adapters/channel/ChannelAdapter";
import ProcessAdapter from "./adapters/process/ProcessAdapter";

@Module({
    providers: [
        PrismaService,
        {
            provide: "IChannelRepository",
            useClass: ChannelAdapter,
        },
        {
            provide: "IProcessRepository",
            useClass: ProcessAdapter,
        },
    ],
    exports: ["IChannelRepository", "IProcessRepository"],
})
export default class PrismaDbModule {}
