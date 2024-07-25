export default class Exception extends Error {
    private code: string;
    private domainMessage: string;
    private detail: string;

    constructor(exception: any, code: string, domainMessage: string, detail?: string) {
        super(exception);
        this.code = code;
        this.domainMessage = domainMessage;
        this.detail = detail;
    }

    getCode(): string {
        return this.code;
    }

    getDomainMessage(): string {
        return this.domainMessage;
    }

    getDetail(): string {
        return this.detail;
    }
}
