import { BadRequestException } from "@nestjs/common";

function extractAuthToken(request: Request): string | undefined {
    return request.headers["authorization"]?.replace("Bearer ", "");
}

function extractAuthTokenWithValidation(authorizationHeader: string): string {
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new BadRequestException("The 'Authorization' header with Bearer scheme is mandatory.");
    }
    return authorizationHeader.replace('Bearer ', '');
  }

export {extractAuthToken, extractAuthTokenWithValidation};
