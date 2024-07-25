import {Module} from "@nestjs/common";
import CustomerAdapter from "./adapters/customer/CustomerAdapter";
import LoggerModule from "../../../../../infrastructure/helpers/logger/src/module/LoggerModule";
import AxiosClient from "./config/AxiosConfig";
import BankAdapter from "./adapters/bank/BankAdapter";
import SurveyAdapter from "./adapters/survey/SurveyAdapter";
import KinshipAdapter from "./adapters/kinship/KinshipAdapter";

@Module({
    imports: [LoggerModule],
    providers: [
        AxiosClient,
        {
            provide: "ICustomerGateway",
            useClass: CustomerAdapter,
        },
        {
            provide: "IBankGateway",
            useClass: BankAdapter,
        },
        {
            provide: "ISurveyGateway",
            useClass: SurveyAdapter,
        },
        {
            provide: "IKinshipGateway",
            useClass: KinshipAdapter,
        },
    ],
    exports: ["ICustomerGateway", "IBankGateway", "ISurveyGateway", "IKinshipGateway"]
})
export default class AxiosClientModule {}