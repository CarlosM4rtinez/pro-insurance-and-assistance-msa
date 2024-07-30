import {Inject, Injectable} from "@nestjs/common";
import Process from "../../../../entities/src/module/entities/process/Process";
import IProcessRepository from "../../../../entities/src/module/entities/process/gateway/IProcessRepository";
import {ProcessBusinessMessage as BusinessMessage} from "../../../../entities/src/module/entities/process/message/ProcessBusinessMessage";
import {checkAndThrowBusinessException} from "../../../../entities/src/module/common/exception/util/ExceptionUtil";
import IAuthTokenGateway from "../../../../entities/src/module/entities/auth_token/gateway/IAuthTokenGateway";
import Channel from "../../../../entities/src/module/entities/channel/Channel";
import IChannelRepository from "../../../../entities/src/module/entities/channel/gateway/IChannelRepository";
import ICustomerGateway from "../../../../entities/src/module/entities/customer/gateway/ICustomerGateway";
import Customer from "../../../../entities/src/module/entities/customer/Customer";

@Injectable()
export default class ProcessUsecase {

    constructor(
        @Inject("IProcessRepository") private readonly processRepository: IProcessRepository,
        @Inject("IAuthTokenGateway") private readonly authTokenGateway: IAuthTokenGateway,
        @Inject("IChannelRepository") private readonly channelRepository: IChannelRepository,
        @Inject("ICustomerGateway") private readonly customerGateway: ICustomerGateway
    ) {}

    public async createProcessStartKey(authorizationToken: string, customerCurp: string, customerRFC: string): Promise<any> {
        const channelFromToken: Channel = this.authTokenGateway.getPayloadFromToken(authorizationToken);
        const channel: Channel = await this.channelRepository.findByAcronym(channelFromToken.getAcronym());
        checkAndThrowBusinessException(!channel, BusinessMessage.MSB_PROCESS_001);
        const customer: Customer = await this.getCustomerByCurpOrRFC(customerCurp, customerRFC);
        const processEntity: Process = await this.processRepository.save(customer, channel, process.env.PROCESS_DURATION);
        const link = process.env.PROCESS_START_URL.concat("", this.defineEncodedPayload(processEntity, customer));
        return {
            linkStartProcess: link,
            duration: processEntity.getDuration(),
        };
    }

    public async findByKey(key: string): Promise<Process> {
        const process = await this.processRepository.findByKey(key);
        checkAndThrowBusinessException(!process, BusinessMessage.MSB_PROCESS_000);
        return process;
    }

    private async getCustomerByCurpOrRFC(customerCurp: string, customerRFC: string): Promise<Customer> {
        if (customerCurp) return await this.customerGateway.findByCurp(customerCurp);
        if (customerRFC) return await this.customerGateway.findByRFC(customerRFC);
        return null;
    }

    private defineEncodedPayload(process: Process, customer: Customer | null): string {
        const payload = {
            processKey: process.getKey(),
            channel: process.getChannel().getAcronym(),
            ...(customer ? {customer} : {}),
        };
        return btoa(JSON.stringify(payload));
    }
}
