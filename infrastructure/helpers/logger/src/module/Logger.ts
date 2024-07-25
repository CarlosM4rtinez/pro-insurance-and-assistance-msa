import {Injectable} from "@nestjs/common";
import buildLogger from "./config/LoggerConfig";

@Injectable()
export default class Logger {
    
    private log = buildLogger();

    error(detail: any) {
        this.log.error(detail);
    }

    info(message: any) {
        this.log.info(message);
    }

}
