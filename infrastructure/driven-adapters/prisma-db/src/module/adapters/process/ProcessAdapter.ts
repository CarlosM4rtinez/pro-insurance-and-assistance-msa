import Process from "../../../../../../../entities/src/module/entities/process/Process";
import IProcessRepository from "../../../../../../../entities/src/module/entities/process/gateway/IProcessRepository";
import {Injectable} from "@nestjs/common";
import {ProcessTechnicalMessage as TechnicalMessage} from "../../../../../../../entities/src/module/entities/process/message/ProcessTechnicalMessage";
import {exceptionHandler} from "../../../../../../../entities/src/module/common/exception/util/ExceptionUtil";
import PrismaService from "../../config/PrismaService";
import ProcessData from "./data/ProcessData";
import ProcessMapper from "./mappers/ProcessMapper";
import Customer from "../../../../../../../entities/src/module/entities/customer/Customer";
import Channel from "../../../../../../../entities/src/module/entities/channel/Channel";

@Injectable()
export default class ProcessAdapter implements IProcessRepository {

    constructor(private readonly prismaService: PrismaService) {}

    async save(customer: Customer, channel: Channel, duration: string): Promise<Process> {
        try {
            const processData = new ProcessData(customer, channel, duration);
            const newProcess = await this.prismaService.process.create({data: processData, include: {channelData: true}});
            return ProcessMapper.toModel(newProcess);
        } catch (exception) {
            exceptionHandler(TechnicalMessage.MST_PROCESS_000, exception);
        }
    }

    async findByKey(key: string): Promise<Process> {
        try {
            const processDb = await this.prismaService.process.findUnique({where: {key: key}, include: {channelData: true}});
            return processDb ? ProcessMapper.toModel(processDb) : null;
        } catch (exception) {
            exceptionHandler(TechnicalMessage.MST_PROCESS_002, exception);
        }
    }

}
