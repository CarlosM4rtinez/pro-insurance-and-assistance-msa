import {Test, TestingModule} from "@nestjs/testing";
import BankAdapter from "../../../module/adapters/bank/BankAdapter";
import AxiosConfig from "../../../module/config/AxiosConfig";
import LoggerModule from "../../../../../../helpers/logger/src/module/LoggerModule";
import Logger from "../../../../../../helpers/logger/src/module/Logger";
import * as nock from "nock";
import TechnicalException from "../../../../../../../entities/src/module/common/exception/TechnicalException";

describe("BankAdapter", () => {

    let bankAdapter: BankAdapter;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BankAdapter, AxiosConfig, LoggerModule, Logger],
        }).compile();
        bankAdapter = module.get<BankAdapter>(BankAdapter);
    });

    afterEach(() => {
        nock.cleanAll();
    });

    it("should retrieve a list of banks", async () => {
        const mockAPI = nock(process.env.API_BASE_URL)
            .post(process.env.API_GET_BANKS)
            .reply(200, {
                banksResBO: {
                    status: "C",
                    code: "200",
                    response: "Service executed successfully.",
                    banks: [
                        {bankId: "001", bankName: "consubanco"},
                        {bankId: "002", bankName: "bancolombia"},
                    ],
                },
            });
        const list = await bankAdapter.list();
        expect(list.length).toEqual(2);
        expect(list[0].getName()).toEqual("consubanco");
        expect(list[0].getId()).toEqual("001");
        expect(list[1].getName()).toEqual("bancolombia");
        expect(list[1].getId()).toEqual("002");
        mockAPI.isDone();
    });
    
    it("should return technical exception when api return status 500", async () => {
        const mockAPI = nock(process.env.API_BASE_URL)
            .post(process.env.API_GET_BANKS)
            .reply(500);
        await expect(bankAdapter.list()).rejects.toThrow(TechnicalException);
        mockAPI.isDone();
    });

    it("should return empty when api return status 200 and not banks", async () => {
        const mockAPI = nock(process.env.API_BASE_URL)
            .post(process.env.API_GET_BANKS)
            .reply(200, {
                banksResBO: {
                    status: "C",
                    code: "200",
                    response: "Service executed successfully."
                }
            });
            const list = await bankAdapter.list();
            expect(list.length).toEqual(0);
        mockAPI.isDone();
    });

    it("should return empty when api return status 200 and 500 in body", async () => {
        process.env.ENABLE_LOGS_SUCCESSFUL_REQUESTS = "false";
        const mockAPI = nock(process.env.API_BASE_URL)
            .post(process.env.API_GET_BANKS)
            .reply(200, {
                banksResBO: {
                    status: "C",
                    code: "500",
                    response: "service not available."
                }
            });
            const list = await bankAdapter.list();
            expect(list.length).toEqual(0);
        mockAPI.isDone();
    });

});
