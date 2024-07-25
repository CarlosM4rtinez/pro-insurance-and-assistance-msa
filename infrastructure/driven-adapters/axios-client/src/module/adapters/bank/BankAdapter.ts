import Bank from "../../../../../../../entities/src/module/entities/bank/Bank";
import IBankGateway from "../../../../../../../entities/src/module/entities/bank/gateway/IBankGateway";
import {Injectable} from "@nestjs/common";
import AxiosConfig from "../../config/AxiosConfig";
import GetBanksRequestDTO from "./dto/GetBanksRequestDTO";
import GetBanksResponseDTO from "./dto/GetBanksResponseDTO";
import BankMapper from "./mapper/BankMapper";
import {exceptionHandler} from "../../../../../../../entities/src/module/common/exception/util/ExceptionUtil";
import {BankTechnicalMessage} from "../../../../../../../entities/src/module/entities/bank/message/BankTechnicalMessage";

@Injectable()
export default class BankAdapter implements IBankGateway {

    constructor(private readonly axiosConfig: AxiosConfig) {}

    public async list(): Promise<Bank[]> {
        try {
            const pathService = process.env.API_GET_BANKS;
            const request = new GetBanksRequestDTO(process.env.API_APPLICATION);
            const responseAPI = await this.axiosConfig.getInstance().post<GetBanksResponseDTO>(pathService, request);
            return BankMapper.toModel(responseAPI.data);
        } catch (exception) {
            exceptionHandler(BankTechnicalMessage.MST_BANK_000, exception);
        }
    }

}
