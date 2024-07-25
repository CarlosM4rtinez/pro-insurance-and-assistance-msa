import Channel from "../../channel/Channel";
import AuthToken from "../AuthToken";

export default interface IAuthTokenGateway {
    validateAuthorizationToken(token: string, secretKey: string): boolean;
    isTokenExpired(token: string): boolean;
    getPayloadFromToken(token: string): Channel;
    createAuthorizationToken(payload: Channel, secretKey: string): AuthToken;
}
