import {Test, TestingModule} from "@nestjs/testing";
import ProcessUsecase from "../../module/process/ProcessUsecase";
import ICustomerGateway from "../../../../entities/src/module/entities/customer/gateway/ICustomerGateway";
import Customer from "../../../../entities/src/module/entities/customer/Customer";
import IAuthTokenGateway from "../../../../entities/src/module/entities/auth_token/gateway/IAuthTokenGateway";
import IChannelRepository from "../../../../entities/src/module/entities/channel/gateway/IChannelRepository";
import IProcessRepository from "../../../../entities/src/module/entities/process/gateway/IProcessRepository";
import Channel from "../../../../entities/src/module/entities/channel/Channel";
import Process from "../../../../entities/src/module/entities/process/Process";
import BusinessException from "../../../../entities/src/module/common/exception/BusinessException";

describe("ProcessUsecase", () => {

    let processUsecase: ProcessUsecase;
    let processRepositoryMock: jest.Mocked<IProcessRepository>;
    let authTokenGatewayMock: jest.Mocked<IAuthTokenGateway>;
    let channelRepositoryMock: jest.Mocked<IChannelRepository>;
    let customerGatewayMock: jest.Mocked<ICustomerGateway>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProcessUsecase,
                {
                    provide: "IProcessRepository",
                    useValue: {
                        save: jest.fn(),
                        findByKey: jest.fn()
                    }
                },
                {
                    provide: "IAuthTokenGateway",
                    useValue: {
                        getPayloadFromToken: jest.fn()
                    }
                },
                {
                    provide: "IChannelRepository",
                    useValue: {
                        findByAcronym: jest.fn()
                    },
                },
                {
                    provide: "ICustomerGateway",
                    useValue: {
                        findByRFC: jest.fn(),
                        findByCurp: jest.fn()
                    }
                }
            ],
        }).compile();
        processUsecase = module.get<ProcessUsecase>(ProcessUsecase);
        processRepositoryMock = module.get<IProcessRepository>("IProcessRepository") as jest.Mocked<IProcessRepository>;
        authTokenGatewayMock = module.get<IAuthTokenGateway>("IAuthTokenGateway") as jest.Mocked<IAuthTokenGateway>;
        channelRepositoryMock = module.get<IChannelRepository>("IChannelRepository") as jest.Mocked<IChannelRepository>;
        customerGatewayMock = module.get<ICustomerGateway>("ICustomerGateway") as jest.Mocked<ICustomerGateway>;
    });

    describe("createProcessStartKey", () => {
        it("should return process start key when customer rfc", async () => {
            process.env.PROCESS_START_URL = "https://seguros.consubanco.com/start/"
            const mockChannel = new Channel("Csb promotor", "pro", "any-key");
            authTokenGatewayMock.getPayloadFromToken.mockReturnValue(mockChannel);
            channelRepositoryMock.findByAcronym.mockResolvedValueOnce(mockChannel);
            const mockCustomer = new Customer("1", "carlos", "alfredo", "martinez", "villada", "any-rfc", "any-curp", "1985-02-22", "sample@gmail.com", "M");
            customerGatewayMock.findByRFC.mockResolvedValueOnce(mockCustomer);
            customerGatewayMock.findByCurp.mockResolvedValueOnce(mockCustomer);
            const mockProcess = new Process(1, "10d71939-a227-499e-8314-c1eb20083db8", "10h", new Date(), new Date(), mockChannel, "01");
            processRepositoryMock.save.mockResolvedValueOnce(mockProcess);
            await expect(processUsecase.createProcessStartKey("any-token", "any-rfc", null)).resolves.not.toThrow();
        });
    });

    describe("createProcessStartKey", () => {
        it("should return process start key when customer curp", async () => {
            process.env.PROCESS_START_URL = "https://seguros.consubanco.com/start/"
            const mockChannel = new Channel("Csb promotor", "pro", "any-key");
            authTokenGatewayMock.getPayloadFromToken.mockReturnValue(mockChannel);
            channelRepositoryMock.findByAcronym.mockResolvedValueOnce(mockChannel);
            const mockCustomer = new Customer("1", "carlos", "alfredo", "martinez", "villada", "any-rfc", "any-curp", "1985-02-22", "sample@gmail.com", "M");
            customerGatewayMock.findByRFC.mockResolvedValueOnce(mockCustomer);
            customerGatewayMock.findByCurp.mockResolvedValueOnce(mockCustomer);
            const mockProcess = new Process(1, "10d71939-a227-499e-8314-c1eb20083db8", "10h", new Date(), new Date(), mockChannel, "01");
            processRepositoryMock.save.mockResolvedValueOnce(mockProcess);
            await expect(processUsecase.createProcessStartKey("any-token", null, "any-curp")).resolves.not.toThrow();
        });
    });

    describe("createProcessStartKey", () => {
        it("should return process start key when not data customer", async () => {
            process.env.PROCESS_START_URL = "https://seguros.consubanco.com/start/"
            const mockChannel = new Channel("Csb promotor", "pro", "any-key");
            authTokenGatewayMock.getPayloadFromToken.mockReturnValue(mockChannel);
            channelRepositoryMock.findByAcronym.mockResolvedValueOnce(mockChannel);
            const mockCustomer = new Customer("1", "carlos", "alfredo", "martinez", "villada", "any-rfc", "any-curp", "1985-02-22", "sample@gmail.com", "M");
            customerGatewayMock.findByRFC.mockResolvedValueOnce(mockCustomer);
            customerGatewayMock.findByCurp.mockResolvedValueOnce(mockCustomer);
            const mockProcess = new Process(1, "10d71939-a227-499e-8314-c1eb20083db8", "10h", new Date(), new Date(), mockChannel, "01");
            processRepositoryMock.save.mockResolvedValueOnce(mockProcess);
            await expect(processUsecase.createProcessStartKey("any-token", null, null)).resolves.not.toThrow();
        });
    });

    describe("findByKey", () => {
        it("should return process when found", async () => {
            const mockChannel = new Channel("Csb promotor", "pro", "any-key");
            const mockProcess = new Process(1, "10d71939-a227-499e-8314-c1eb20083db8", "10h", new Date(), new Date(), mockChannel, "01");
            processRepositoryMock.findByKey.mockResolvedValueOnce(mockProcess);
            await expect(processUsecase.findByKey("any-key")).resolves.not.toThrow();
        });
    });

    describe("findByKey", () => {
        it("should return process when not found", async () => {
            processRepositoryMock.findByKey.mockResolvedValueOnce(null);
            await expect(processUsecase.findByKey("any-key")).rejects.toThrow(BusinessException);
        });
    });
    
});
