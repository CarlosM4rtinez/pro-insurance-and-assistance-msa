import {Test, TestingModule} from "@nestjs/testing";
import CreateAuthorizationTokenUsecase from "../../module/auth_token/CreateAuthorizationTokenUsecase";
import IChannelRepository from "../../../../entities/src/module/entities/channel/gateway/IChannelRepository";
import Channel from "../../../../entities/src/module/entities/channel/Channel";
import IEncryptorUtil from "../../../../entities/src/module/common/services/IEncryptorService";
import IAuthTokenGateway from "../../../../entities/src/module/entities/auth_token/gateway/IAuthTokenGateway";
import AuthToken from "../../../../entities/src/module/entities/auth_token/AuthToken";

describe("CreateAuthorizationTokenUsecase", () => {

    let createAuthorizationTokenUsecase: CreateAuthorizationTokenUsecase;
    let authTokenGatewayMock: jest.Mocked<IAuthTokenGateway>;
    let channelRepositoryMock: jest.Mocked<IChannelRepository>;
    let encryptorUtilMock: jest.Mocked<IEncryptorUtil>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateAuthorizationTokenUsecase,
                {
                    provide: "IChannelRepository",
                    useValue: {
                        findByAcronym: jest.fn(),
                    }
                },
                {
                    provide: "IEncryptorUtil",
                    useValue: {
                        compare: jest.fn()
                    },
                },
                {
                    provide: "IAuthTokenGateway",
                    useValue: {
                        createAuthorizationToken: jest.fn()
                    },
                }
            ],
        }).compile();
        createAuthorizationTokenUsecase = module.get<CreateAuthorizationTokenUsecase>(CreateAuthorizationTokenUsecase);
        channelRepositoryMock = module.get<IChannelRepository>("IChannelRepository") as jest.Mocked<IChannelRepository>;
        encryptorUtilMock = module.get<IEncryptorUtil>("IEncryptorUtil") as jest.Mocked<IEncryptorUtil>;
        authTokenGatewayMock = module.get<IAuthTokenGateway>("IAuthTokenGateway") as jest.Mocked<IAuthTokenGateway>;
    });

    describe("CreateAuthorizationToken", () => {
        it("should return channel when found", async () => {
            const mockChannel = new Channel("Csb promotor", "pro", "any-key");
            channelRepositoryMock.findByAcronym.mockResolvedValueOnce(mockChannel);
            encryptorUtilMock.compare.mockResolvedValueOnce(true);
            const mockAuthToken = new AuthToken("any-token", "24h");
            authTokenGatewayMock.createAuthorizationToken.mockReturnValue(mockAuthToken);
            const authToken = await createAuthorizationTokenUsecase.execute("pro", "any-secret-key", );
            expect(authToken.getDuration()).toEqual("24h");
        });
    });

});
