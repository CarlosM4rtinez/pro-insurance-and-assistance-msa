import * as request from "supertest";
import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import AppModule from "../../../../../../../app/src/config/app.module";
import ChannelAdapter from "../../../../../../../infrastructure/driven-adapters/prisma-db/src/module/adapters/channel/ChannelAdapter";
import IChannelRepository from "../../../../../../../entities/src/module/entities/channel/gateway/IChannelRepository";
import {buildChannel, checkBadRequest, checkConflict, checkCreated, checkOk} from "../../test-utils";

jest.mock("../../../../../../../infrastructure/driven-adapters/prisma-db/src/module/adapters/process/ProcessAdapter");
jest.mock("../../../../../../../infrastructure/driven-adapters/prisma-db/src/module/adapters/channel/ChannelAdapter");
jest.mock("../../../../../../../entities/src/module/entities/channel/gateway/IChannelRepository");

describe("AuthTokenController", () => {
    
    const AUTH_TOKEN_API_PATH = "/api/v1/channel/auth-token";
    let app: INestApplication;
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
                        list: jest.fn(),
                        findByName: jest.fn(),
                        save: jest.fn(),
                    },
                },
            ],
        }).compile();
        app = module.createNestApplication();
        await app.init();
        channelRepositoryMock = module.get("IChannelRepository");
        channelAdapterMock = {findByAcronym: channelRepositoryMock.findByAcronym} as jest.Mocked<ChannelAdapter>;
    });

    afterAll(async () => {
        await app.close();
    });

    describe("create:POST:" + AUTH_TOKEN_API_PATH, () => {
        it("should return bad request when invalid acronym channel.", async () => {
            const response = await buildRequest("promotor", "any-secret-key-of-the-channel-with-64-characters-complete-encrypted");
            checkBadRequest(response);
        });
        it("should return business exception status 409 when invalid secret key.", async () => {
            channelRepositoryMock.findByAcronym.mockResolvedValueOnce(buildChannel());
            const response = await buildRequest("pro", "9695f3ed3a88462f9217f14d0f71ae259695f3ed3a88462f9217f14d0f7123456789");
            checkConflict(response);
        });
        it("should return status created when valid request.", async () => {
            channelRepositoryMock.findByAcronym.mockResolvedValueOnce(buildChannel());
            const response = await buildRequest("pro", "OTY5NWYzZWQzYTg4NDYyZjkyMTdmMTRkMGY3MWFlMjU5Njk1ZjNlZDNhODg0NjJmOTIxN2YxNGQwZjcxYWUyNQ==");
            checkCreated(response);
            expect(response.body).toHaveProperty("token");
            expect(response.body).toHaveProperty("duration");
        });
    });

    describe("validate:GET:" + AUTH_TOKEN_API_PATH, () => {
        it("should return status ok when valid token.", async () => {
            channelRepositoryMock.findByAcronym.mockResolvedValueOnce(buildChannel());
            const requestCreateAuthToken = await buildRequest("pro", "OTY5NWYzZWQzYTg4NDYyZjkyMTdmMTRkMGY3MWFlMjU5Njk1ZjNlZDNhODg0NjJmOTIxN2YxNGQwZjcxYWUyNQ==");
            channelRepositoryMock.findByAcronym.mockResolvedValueOnce(buildChannel());
            const response = await request(app.getHttpServer()).get(AUTH_TOKEN_API_PATH).set("Authorization", `Bearer ${requestCreateAuthToken.body.token}`);
            checkOk(response);
            expect(response.body).toHaveProperty("message");
            expect(response.body).toHaveProperty("date");
        });
    });

    async function buildRequest(channel: string, secretKey: string) {
        return await request(app.getHttpServer())
            .post(AUTH_TOKEN_API_PATH)
            .send({
                channel: channel,
                secretKey: secretKey,
            })
            .set("Accept", "application/json");
    }
});
