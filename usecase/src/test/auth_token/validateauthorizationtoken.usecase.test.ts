import {Test, TestingModule} from "@nestjs/testing";
import ValidateAuthorizationTokenUsecase from "../../module/auth_token/ValidateAuthorizationTokenUsecase";
import IChannelRepository from "../../../../entities/src/module/entities/channel/gateway/IChannelRepository";
import Channel from "../../../../entities/src/module/entities/channel/Channel";
import IAuthTokenGateway from "../../../../entities/src/module/entities/auth_token/gateway/IAuthTokenGateway";

describe("ValidateAuthorizationTokenUsecase", () => {

    let validateAuthorizationTokenUsecase: ValidateAuthorizationTokenUsecase;
    let authTokenGatewayMock: jest.Mocked<IAuthTokenGateway>;
    let channelRepositoryMock: jest.Mocked<IChannelRepository>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ValidateAuthorizationTokenUsecase,
                {
                    provide: "IChannelRepository",
                    useValue: {
                        findByAcronym: jest.fn()
                    }
                },
                {
                    provide: "IAuthTokenGateway",
                    useValue: {
                        isTokenExpired: jest.fn(),
                        getPayloadFromToken: jest.fn(),
                        validateAuthorizationToken: jest.fn()
                    }
                }
            ],
        }).compile();
        validateAuthorizationTokenUsecase = module.get<ValidateAuthorizationTokenUsecase>(ValidateAuthorizationTokenUsecase);
        channelRepositoryMock = module.get<IChannelRepository>("IChannelRepository") as jest.Mocked<IChannelRepository>;
        authTokenGatewayMock = module.get<IAuthTokenGateway>("IAuthTokenGateway") as jest.Mocked<IAuthTokenGateway>;
    });

    describe("CreateAuthorizationToken", () => {
        it("should return void when token is valid", async () => {
            const mockChannel = new Channel("Csb promotor", "pro", "any-key");
            authTokenGatewayMock.isTokenExpired.mockReturnValue(false);
            authTokenGatewayMock.getPayloadFromToken.mockReturnValue(mockChannel);
            authTokenGatewayMock.validateAuthorizationToken.mockReturnValue(true);
            channelRepositoryMock.findByAcronym.mockResolvedValueOnce(mockChannel);
            await expect(validateAuthorizationTokenUsecase.execute("any-token-encoded")).resolves.not.toThrow();
        });
    });

});
