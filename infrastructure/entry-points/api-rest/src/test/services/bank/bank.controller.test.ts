import * as request from "supertest";
import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import AppModule from "../../../../../../../app/src/config/app.module";
import Bank from "../../../../../../../entities/src/module/entities/bank/Bank";
import IBankGateway from "../../../../../../../entities/src/module/entities/bank/gateway/IBankGateway";
import {checkBadRequest, checkOk, checkUnauthorized, createAuthToken, mockChannel} from "../../test-utils";
import BankAdapter from "../../../../../../driven-adapters/axios-client/src/module/adapters/bank/BankAdapter";
import ChannelAdapter from "../../../../../../../infrastructure/driven-adapters/prisma-db/src/module/adapters/channel/ChannelAdapter";
import IChannelRepository from "../../../../../../../entities/src/module/entities/channel/gateway/IChannelRepository";

jest.mock("../../../../../../../entities/src/module/entities/bank/gateway/IBankGateway");
jest.mock("../../../../../../driven-adapters/axios-client/src/module/adapters/bank/BankAdapter");
jest.mock("../../../../../../../infrastructure/driven-adapters/prisma-db/src/module/adapters/channel/ChannelAdapter");
jest.mock("../../../../../../../infrastructure/driven-adapters/prisma-db/src/module/adapters/process/ProcessAdapter");

describe("BankController", () => {

    const BANK_API_PATH = "/api/v1/bank/";
    let app: INestApplication;
    let bankGatewayMock: jest.Mocked<IBankGateway>;
    let bankAdapterMock: jest.Mocked<BankAdapter>;
    let channelAdapterMock: jest.Mocked<ChannelAdapter>;
    let channelRepositoryMock: jest.Mocked<IChannelRepository>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
            providers: [
                {
                    provide: "IChannelRepository",
                    useValue: {
                        findByAcronym: jest.fn(),
                    },
                },
                {
                    provide: "IBankGateway",
                    useValue: {
                        list: jest.fn(),
                    },
                },
            ],
        }).compile();
        app = module.createNestApplication();
        await app.init();
        bankGatewayMock = module.get("IBankGateway");
        bankAdapterMock = {list: bankGatewayMock.list} as jest.Mocked<BankAdapter>;
        channelRepositoryMock = module.get("IChannelRepository");
        channelAdapterMock = {findByAcronym: channelRepositoryMock.findByAcronym} as jest.Mocked<ChannelAdapter>;
    });

    afterAll(async () => {
        await app.close();
    });

    describe("list:GET:" + BANK_API_PATH, () => {
        it("should return bad request when not send authorization token.", async () => {
            bankGatewayMock.list.mockResolvedValueOnce(buildBankList());
            const response = await request(app.getHttpServer()).get(BANK_API_PATH);
            checkBadRequest(response);
        });
        it("should return bad request when invalid token.", async () => {
            bankGatewayMock.list.mockResolvedValueOnce(buildBankList());
            const response = await request(app.getHttpServer()).get(BANK_API_PATH).set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImNoYW5uZWwiOiJCYW`);
            checkUnauthorized(response);
        });
        it("should return bank list status ok when valid request.", async () => {
            bankGatewayMock.list.mockResolvedValueOnce(buildBankList());
            const authToken = await createAuthToken(app, channelRepositoryMock);
            mockChannel(channelRepositoryMock);
            const response = await request(app.getHttpServer()).get(BANK_API_PATH).set("Authorization", `Bearer ${authToken}`);
            checkOk(response);
        });
    });

    function buildBankList() {
        return [new Bank("01", "Consubanco"), new Bank("02", "Bank")];
    }

});
