import {Module} from "@nestjs/common";
import AuthTokenAdapter from "./adapters/AuthTokenAdapter";
import LoggerModule from "../../../../../infrastructure/helpers/logger/src/module/LoggerModule";

@Module({
    imports: [LoggerModule],
    providers: [
        {
            provide: "IAuthTokenGateway",
            useClass: AuthTokenAdapter,
        },
    ],
    exports: ["IAuthTokenGateway"],
})
export default class JwtModule {}
