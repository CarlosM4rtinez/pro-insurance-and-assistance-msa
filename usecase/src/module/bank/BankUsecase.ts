import {Inject, Injectable} from "@nestjs/common";
import Bank from "../../../../entities/src/module/entities/bank/Bank";
import IBankGateway from "../../../../entities/src/module/entities/bank/gateway/IBankGateway";

@Injectable()
export default class BankUsecase {

    constructor(@Inject("IBankGateway") private readonly bankGateway: IBankGateway) {}

    public async list(): Promise<Bank[]> {
        return await this.bankGateway.list();
    }

}
