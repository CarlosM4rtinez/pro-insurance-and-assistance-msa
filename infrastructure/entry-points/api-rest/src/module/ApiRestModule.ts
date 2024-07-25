import {MiddlewareConsumer, Module, NestModule, RequestMethod, ValidationPipe} from "@nestjs/common";
import {APP_FILTER} from "@nestjs/core";
import {APP_PIPE} from "@nestjs/core";
import AuthTokenController from "./services/auth_token/AuthTokenController";
import UsecaseModule from "../../../../../app/src/config/usecase.module";
import ChannelController from "./services/channel/ChannelController";
import GlobalExceptionFilter from "./filters/GlobalExceptionFilter";
import LoggerModule from "../../../../../infrastructure/helpers/logger/src/module/LoggerModule";
import JwtValidationMiddleware from "./middlewares/JwtValidationMiddleware";
import CustomerController from "./services/customer/CustomerController";
import ProcessController from "./services/process/ProcessController";
import BankController from "./services/bank/BankController";
import SurveyController from "./services/survey/SurveyController";
import KinshipController from "./services/kinship/KinshipController";

@Module({
    imports: [UsecaseModule, LoggerModule],
    controllers: [AuthTokenController, ChannelController, CustomerController, ProcessController, BankController, SurveyController, KinshipController],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ValidationPipe,
        },
        {
            provide: APP_FILTER,
            useClass: GlobalExceptionFilter,
        },
    ],
})
export default class ApiRestModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(JwtValidationMiddleware)
            .exclude({path: "/api/v1/channel/auth-token", method: RequestMethod.ALL})
            .forRoutes("*");
    }
}
