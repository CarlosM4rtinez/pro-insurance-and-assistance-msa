import {ExceptionFilter, Catch, ArgumentsHost, HttpStatus, HttpException, BadRequestException, UnauthorizedException, NotFoundException} from "@nestjs/common";
import {Request, Response} from "express";
import BusinessException from "../../../../../../entities/src/module/common/exception/BusinessException";
import TechnicalException from "../../../../../../entities/src/module/common/exception/TechnicalException";
import ErrorDTO from "../commons/dto/ErrorDTO";
import Logger from "../../../../../../infrastructure/helpers/logger/src/module/Logger";
import LogDTO from "../commons/dto/LogDTO";

@Catch(Error)
export default class GlobalExceptionFilter implements ExceptionFilter {

    constructor(private readonly logger: Logger) {}

    catch(exception: Error, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const response = context.getResponse<Response>();
        const data = this.getDataFromException(exception);
        const errorResponse = this.buildErrorResponse(response, data.status, data.error);
        this.logger.error(new LogDTO(request, errorResponse, exception, data.error));
        return errorResponse;
    }

    private getDataFromException(exception: Error) {
        switch (exception.constructor) {
            case TechnicalException:
                return this.buildTechnicalError(exception as TechnicalException);
            case BusinessException:
                return this.buildBusinessError(exception as BusinessException);
            case BadRequestException:
                return this.buildBadRequestError(exception as BadRequestException);
            case UnauthorizedException:
                return this.buildUnauthorizedError(exception as UnauthorizedException);
            case NotFoundException:
                return this.buildNotFoundError(exception as NotFoundException);
            default:
                return this.buildDefaultError(exception);
        }
    }

    private buildTechnicalError(exception: TechnicalException) {
        const errorDTO = new ErrorDTO(exception.getCode(), exception.getDomainMessage(), exception.message);
        return {error: errorDTO, status: HttpStatus.INTERNAL_SERVER_ERROR};
    }

    private buildBusinessError(exception: BusinessException) {
        const message = `${exception.message}${exception.message.endsWith(".") ? "" : "."}`;
        const detail = exception.getDetail() ? `${message} Detail: ${exception.getDetail()}` : exception.message;
        const errorDTO = new ErrorDTO(exception.getCode(), exception.getDomainMessage(), detail);
        return {error: errorDTO, status: HttpStatus.CONFLICT};
    }

    private buildBadRequestError(exception: BadRequestException) {
        const errorDTO = new ErrorDTO("BAD_REQUEST", "Bad request.", this.getDetailFromException(exception));
        return {error: errorDTO, status: HttpStatus.BAD_REQUEST};
    }

    private buildUnauthorizedError(exception: UnauthorizedException) {
        const code = this.getCodeFromException(exception, "UNAUTHORIZED");
        const errorDTO = new ErrorDTO(code, "Unauthorized.", this.getDetailFromException(exception));
        return {error: errorDTO, status: HttpStatus.UNAUTHORIZED};
    }

    private buildNotFoundError(exception: NotFoundException) {
        const code = this.getCodeFromException(exception, "NOT_FOUND");
        const errorDTO = new ErrorDTO(code, "Resource not found.", this.getDetailFromException(exception));
        return {error: errorDTO, status: HttpStatus.NOT_FOUND};
    }

    private buildDefaultError(exception: Error) {
        const errorDTO = new ErrorDTO("INTERNAL_ERROR", "Undefined error.", exception.message);
        return {error: errorDTO, status: HttpStatus.INTERNAL_SERVER_ERROR};
    }

    private buildErrorResponse(response: Response, httpStatusCode: number, error: ErrorDTO) {
        return response.status(httpStatusCode).send(error);
    }

    private getDetailFromException(exception: BadRequestException): string {
        const response = exception.getResponse();
        if (typeof response === "object" && response !== null && "message" in response) {
            const message = response["message"];
            if (Array.isArray(message)) return message.join(" ");
            if (typeof message === "string") return message;
        }
        return response?.toString();
    }

    private getCodeFromException(exception: HttpException, defaultValue: string): string {
        const response = exception.getResponse();
        if (typeof response === "object" && response !== null && "code" in response) {
            const code = response["code"];
            return typeof code === "string" ? code : defaultValue;
        }
        return defaultValue;
    }
}
