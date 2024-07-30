import {Inject, Injectable} from "@nestjs/common";
import Customer from "entities/src/module/entities/customer/Customer";
import ICustomerGateway from "entities/src/module/entities/customer/gateway/ICustomerGateway";
import {checkAndThrowBusinessException} from "../../../../entities/src/module/common/exception/util/ExceptionUtil";
import {ChannelBusinessMessage as BusinessException} from "../../../../entities/src/module/entities/customer/message/CustomerBusinessMessage";

@Injectable()
export default class CustomerUsecase {

    constructor(@Inject("ICustomerGateway") private readonly customerGateway: ICustomerGateway) {}

    async findByRFC(rfc: string): Promise<Customer> {
        const customer = await this.customerGateway.findByRFC(rfc);
        checkAndThrowBusinessException(!customer, BusinessException.MSB_CUSTOMER_000);
        return customer;
    }

    async findByCurp(curp: string): Promise<Customer> {
        const customer = await this.customerGateway.findByCurp(curp);
        checkAndThrowBusinessException(!customer, BusinessException.MSB_CUSTOMER_001);
        return customer;
    }

    async findById(id: string): Promise<Customer> {
        const customer = await this.customerGateway.findById(id);
        checkAndThrowBusinessException(!customer, BusinessException.MSB_CUSTOMER_002);
        return customer;
    }
    
}
