import BusinessException from "../BusinessException";
import TechnicalException from "../TechnicalException";

function throwBusinessException(businessMessage: {code: string; message: string}, detail?: any): never {
    throw new BusinessException(businessMessage, detail);
}

function throwTechnicalException(technicalMessage: {code: string; message: string}, exception: any): never {
    throw new TechnicalException(technicalMessage, exception);
}

function checkAndThrowBusinessException(condition: boolean, businessMessage: {code: string; message: string}, detail?: string): void {
    if (condition) {
        throwBusinessException(businessMessage, detail);
    }
}

function exceptionHandler(technicalMessage: {code: string; message: string}, exception: any): never {
    throw new TechnicalException(technicalMessage, exception);
}

export {throwBusinessException, throwTechnicalException, checkAndThrowBusinessException, exceptionHandler};
