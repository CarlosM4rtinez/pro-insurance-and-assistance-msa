import {isEmptyObject} from "../../../../../../../entities/src/module/common/services/ValidatorService";

export default class LogDTO {
    
    message: string;
    request: any;
    response: any;
    exception: any;

    constructor(request: any, response: any, exception: any, responseBody: any) {
        this.message = "Service request information.";
        this.request = this.buildLogRequest(request);
        this.response = this.buildLogResponse(response, responseBody);
        this.exception = this.buildLogException(exception);
    }

    buildLogRequest(request: {originalUrl: any; method: any; params: any; query: any; headers: any; body: any}) {
        return {
            url: request.originalUrl,
            method: request.method,
            ...(isEmptyObject(request.params) ? {} : {params: request.params}),
            ...(isEmptyObject(request.query) ? {} : {query: request.query}),
            headers: request.headers,
            ...(isEmptyObject(request.body) ? {} : {body: request.body}),
        };
    }

    buildLogResponse(response: any, responseBody: any) {
        return {
            status: response.statusCode,
            statusMessage: response.statusMessage,
            headers: response.getHeaders(),
            body: responseBody,
        };
    }

    buildLogException(exception: any) {
        return {
            type: exception.constructor.name,
            message: exception.message,
            stackTrace: this.getStackTrace(exception),
        };
    }

    getStackTrace(exception: any): string {
        return exception.stack
            .split("\n")
            .reverse()
            .map((line: string, index: number) => index + 1 + ": " + line.trim());
    }
}
