import {Injectable} from "@nestjs/common";
import IEncryptorUtil from "../../../../../../entities/src/module/common/services/IEncryptorService";
import * as bcrypt from "bcrypt";
import {exceptionHandler} from "../../../../../../entities/src/module/common/exception/util/ExceptionUtil";
import {AuthTokenTechnicalMessage as TechnicalMessage} from "../../../../../../entities/src/module/entities/auth_token/message/AuthTokenTechnicalMessage";

@Injectable()
export default class EncryptorUtilAdapter implements IEncryptorUtil {

    private readonly saltRounds: number;

    constructor() {
        this.saltRounds = 10;
    }

    async encrypt(data: string): Promise<string> {
        try {
            const salt = await bcrypt.genSalt(this.saltRounds);
            return await bcrypt.hash(data, salt);
        } catch (exception) {
            exceptionHandler(TechnicalMessage.MST_AUTH_TOKEN_004, exception);
        }
    }

    async compare(data: string, hash: string): Promise<boolean> {
        try {
            return await bcrypt.compare(data, hash);
        } catch (exception) {
            exceptionHandler(TechnicalMessage.MST_AUTH_TOKEN_005, exception);
        }
    }
}
