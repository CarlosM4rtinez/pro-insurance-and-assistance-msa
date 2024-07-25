import {Injectable} from "@nestjs/common";
import Customer from "../../../../../../../entities/src/module/entities/customer/Customer";
import ICustomerGateway from "../../../../../../../entities/src/module/entities/customer/gateway/ICustomerGateway";
import AxiosConfig from "../../config/AxiosConfig";
import SearchInterlocutorResponseDTO from "./dto/SearchInterlocutorResponseDTO";
import CustomerMapper from "./mapper/CustomerMapper";
import {exceptionHandler} from "../../../../../../../entities/src/module/common/exception/util/ExceptionUtil";
import {CustomerTechnicalMessage as TechnicalMessage} from "../../../../../../../entities/src/module/entities/customer/message/CustomerTechnicalMessage";
import {AxiosInstance} from "axios";
import buildRequestSearchInterlocutor from "./dto/SearchInterlocutorRequestDTO";

@Injectable()
export default class CustomerAdapter implements ICustomerGateway {

    private client: AxiosInstance;
    private retries: number;

    constructor(private readonly axiosConfig: AxiosConfig) {
        this.client = this.axiosConfig.getInstance();
        this.retries = Number(process.env.RETRIES_API_SEARCH_INTERLOCUTOR);
        this.axiosConfig.retriesConfiguration();
    }

    public async findByRFC(rfc: string): Promise<Customer> {
        return this.searchInterlocutor({rfc});
    }

    public async findByCurp(curp: string): Promise<Customer> {
        return this.searchInterlocutor({curp});
    }

    public async findById(clientId: string): Promise<Customer> {
        return this.searchInterlocutor({clientId});
    }

    private async searchInterlocutor(data: Record<string, any>): Promise<Customer> {
        try {
            const pathService = process.env.API_SEARCH_INTERLOCUTOR;
            const request = buildRequestSearchInterlocutor(data);
            const retryConfig = this.axiosConfig.setRetries(this.retries);
            const responseAPI = await this.client.post<SearchInterlocutorResponseDTO>(pathService, request, retryConfig);
            return CustomerMapper.toModel(responseAPI.data);
        } catch (exception) {
            exceptionHandler(TechnicalMessage.MST_CUSTOMER_000, exception);
        }
    }
}
