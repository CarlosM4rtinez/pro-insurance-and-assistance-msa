import {BadRequestException, Injectable, NestMiddleware, UnauthorizedException} from "@nestjs/common";
import BusinessException from "../../../../../../entities/src/module/common/exception/BusinessException";
import TechnicalException from "../../../../../../entities/src/module/common/exception/TechnicalException";
import ValidateAuthorizationTokenUsecase from "../../../../../../usecase/src/module/auth_token/ValidateAuthorizationTokenUsecase";

@Injectable()
export default class JwtValidationMiddleware implements NestMiddleware {
    constructor(private readonly validateAuthorizationTokenUsecase: ValidateAuthorizationTokenUsecase) {}

    async use(request: any, response: any, next: (error?: any) => void) {
        try {
            const authorizationToken = this.getAuthorizationToken(request);
            await this.validateAuthorizationTokenUsecase.execute(authorizationToken);
            next();
        } catch (exception) {
            if (exception instanceof BusinessException || exception instanceof TechnicalException) {
                throw new UnauthorizedException(exception);
            }
            next(exception);
        }
    }

    getAuthorizationToken = (request: any): string => {
        const authorizationHeader = request.headers?.authorization;
        if (!authorizationHeader || !authorizationHeader?.startsWith("Bearer ")) {
            throw new BadRequestException("The 'Authorization' header with Bearer scheme is mandatory.");
        }
        return authorizationHeader.replace("Bearer ", "");
    };
}
