import {Module} from "@nestjs/common";
import BcryptModule from "../../../infrastructure/driven-adapters/bcrypt/src/module/BcryptModule";
import JwtModule from "../../../infrastructure/driven-adapters/jwt/src/module/JwtModule";
import PrismaDbModule from "../../../infrastructure/driven-adapters/prisma-db/src/module/PrismaDbModule";
import AxiosClientModule from "../../../infrastructure/driven-adapters/axios-client/src/module/AxiosClientModule"
import CreateAuthorizationTokenUsecase from "../../../usecase/src/module/auth_token/CreateAuthorizationTokenUsecase";
import ChannelUsecase from "../../../usecase/src/module/channel/ChannelUsecase";
import ValidateAuthorizationTokenUsecase from "../../../usecase/src/module/auth_token/ValidateAuthorizationTokenUsecase";
import CustomerUsecase from "../../../usecase/src/module/customer/CustomerUsecase";
import ProcessUsecase from "../../../usecase/src/module/process/ProcessUsecase";
import BankUsecase from "../../../usecase/src/module/bank/BankUsecase";
import SurveyUsecase from "usecase/src/module/survey/SurveyUsecase";
import KinshipUsecase from "usecase/src/module/kinship/KinshipUsecase";

@Module({
    imports: [BcryptModule, JwtModule, PrismaDbModule, AxiosClientModule],
    providers: [
        CreateAuthorizationTokenUsecase, ChannelUsecase, ValidateAuthorizationTokenUsecase, 
        CustomerUsecase, ProcessUsecase, BankUsecase, SurveyUsecase, KinshipUsecase
    ],
    exports: [
        CreateAuthorizationTokenUsecase, ChannelUsecase, ValidateAuthorizationTokenUsecase, 
        CustomerUsecase, ProcessUsecase, BankUsecase, SurveyUsecase, KinshipUsecase
    ]
})
export default class UsecaseModule {}
