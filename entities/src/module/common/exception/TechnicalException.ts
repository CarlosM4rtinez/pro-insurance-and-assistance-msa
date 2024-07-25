import Exception from "./Exception";

export default class TechnicalException extends Exception {
    constructor(technicalMessage: {code: string; message: string}, exception: any) {
        super(exception, technicalMessage.code, technicalMessage.message);
    }
}
