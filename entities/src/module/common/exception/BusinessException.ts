import Exception from "./Exception";

export default class BusinessException extends Exception {
    constructor(businessMessage: {code: string; message: string}, detail?: string) {
        super(businessMessage.message, businessMessage.code, businessMessage.message, detail);
    }
}
