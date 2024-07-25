import {Injectable} from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import IAuthTokenGateway from "../../../../../../entities/src/module/entities/auth_token/gateway/IAuthTokenGateway";
import AuthToken from "../../../../../../entities/src/module/entities/auth_token/AuthToken";
import {exceptionHandler} from "../../../../../../entities/src/module/common/exception/util/ExceptionUtil";
import {AuthTokenTechnicalMessage as TechnicalMessage} from "../../../../../../entities/src/module/entities/auth_token/message/AuthTokenTechnicalMessage";
import Channel from "../../../../../../entities/src/module/entities/channel/Channel";
import TechnicalException from "../../../../../../entities/src/module/common/exception/TechnicalException";
import Logger from "../../../../../helpers/logger/src/module/Logger";

@Injectable()
export default class AuthTokenAdapter implements IAuthTokenGateway {
    
    private readonly tokenDuration: string = process.env.TOKEN_DURATION || "1h";

    constructor(private readonly logger: Logger) {
        logger.info(`The duration of the jwt tokens is ${this.tokenDuration}.`);
    }

    createAuthorizationToken(channel: Channel, secretKey: string): AuthToken {
        try {
            const payload = {channel: channel.getName(), acronym: channel.getAcronym()};
            const token = jwt.sign({data: payload}, secretKey, {expiresIn: this.tokenDuration});
            return new AuthToken(token, this.tokenDuration);
        } catch (exception) {
            exceptionHandler(TechnicalMessage.MST_AUTH_TOKEN_002, exception);
        }
    }

    validateAuthorizationToken(token: string, secretKey: string): boolean {
        try {
            jwt.verify(token, secretKey);
            return true;
        } catch (exception) {
            exceptionHandler(TechnicalMessage.MST_AUTH_TOKEN_001, exception);
        }
    }

    isTokenExpired(token: string): boolean {
        try {
            const decoded = jwt.decode(token);
            if (!decoded?.exp) exceptionHandler(TechnicalMessage.MST_AUTH_TOKEN_007, TechnicalMessage.MST_AUTH_TOKEN_007.message);
            return new Date(decoded.exp * 1000) < new Date();
        } catch (exception) {
            if (exception instanceof TechnicalException) throw exception;
            exceptionHandler(TechnicalMessage.MST_AUTH_TOKEN_003, exception);
        }
    }

    getPayloadFromToken(token: string): Channel {
        try {
            const data = jwt.decode(token)?.data;
            if (!data?.channel || !data?.acronym) exceptionHandler(TechnicalMessage.MST_AUTH_TOKEN_008, TechnicalMessage.MST_AUTH_TOKEN_008.message);
            return new Channel(data.channel, data.acronym);
        } catch (exception) {
            if (exception instanceof TechnicalException) throw exception;
            exceptionHandler(TechnicalMessage.MST_AUTH_TOKEN_006, exception);
        }
    }

}
