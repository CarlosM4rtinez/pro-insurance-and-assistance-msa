import {Test, TestingModule} from "@nestjs/testing";
import ChannelUsecase from "../../module/channel/ChannelUsecase";
import IChannelRepository from "../../../../entities/src/module/entities/channel/gateway/IChannelRepository";
import Channel from "../../../../entities/src/module/entities/channel/Channel";
import BusinessException from "../../../../entities/src/module/common/exception/BusinessException";
import IEncryptorUtil from "entities/src/module/common/services/IEncryptorService";

describe("ChannelUsecase", () => {

    let channelUsecase: ChannelUsecase;
    let channelRepositoryMock: jest.Mocked<IChannelRepository>;
    let encryptorUtilMock: jest.Mocked<IEncryptorUtil>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ChannelUsecase,
                {
                    provide: "IChannelRepository",
                    useValue: {
                        findByAcronym: jest.fn(),
                        list: jest.fn(),
                        findByName: jest.fn(),
                        save: jest.fn(),
                    },
                },
                {
                    provide: "IEncryptorUtil",
                    useValue: {
                        encrypt: jest.fn(),
                        compare: jest.fn(),
                    },
                }
            ],
        }).compile();
        channelUsecase = module.get<ChannelUsecase>(ChannelUsecase);
        channelRepositoryMock = module.get<IChannelRepository>("IChannelRepository") as jest.Mocked<IChannelRepository>;
        encryptorUtilMock = module.get<IEncryptorUtil>("IEncryptorUtil") as jest.Mocked<IEncryptorUtil>;
    });

    describe("findByAcronym", () => {
        it("should return channel when found", async () => {
            const mockChannel = new Channel("Csb promotor", "pro", "any-key");
            channelRepositoryMock.findByAcronym.mockResolvedValueOnce(mockChannel);
            const channel = await channelUsecase.findByAcronym("pro");
            expect(channel.getName()).toEqual("Csb promotor");
        });
        it("should return channel when is not found", async () => {
            channelRepositoryMock.findByAcronym.mockResolvedValueOnce(null);
            await expect(channelUsecase.findByAcronym("any-key")).rejects.toThrow(BusinessException);
        });
    });

    describe("list", () => {
        it("should return list channel when found", async () => {
            const mockChannel = new Channel("Csb promotor", "pro", "any-key");
            const listMockChannel = [ mockChannel, mockChannel];
            channelRepositoryMock.list.mockResolvedValueOnce(listMockChannel);
            const listChannel = await channelUsecase.list();
            expect(listChannel.length).toEqual(2);
        });
    });

    describe("create", () => {
        it("should return list channel when found", async () => {
            channelRepositoryMock.findByName.mockResolvedValueOnce(null);
            channelRepositoryMock.findByAcronym.mockResolvedValueOnce(null);
            encryptorUtilMock.encrypt.mockResolvedValueOnce("any-secret-encrypted");
            const channelMock = new Channel("promotor", "pro", "any-secret-encrypted", 1, new Date(), new Date());
            channelRepositoryMock.save.mockResolvedValueOnce(channelMock);
            const channelCreated = await channelUsecase.create("promotor", "pro", "any-secret");
            expect(channelCreated.getId()).toEqual(1);
            expect(channelCreated.getAcronym()).toEqual("pro");
            expect(channelCreated.getSecretKey()).toEqual("any-secret-encrypted");
            expect(channelCreated.getUpdatedAt()).toBeDefined();
            expect(channelCreated.getCreatedAt()).toBeDefined();
        });
    });

});
