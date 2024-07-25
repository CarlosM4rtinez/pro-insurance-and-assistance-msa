import {Test, TestingModule} from "@nestjs/testing";
import CustomerAdapter from "../../../module/adapters/customer/CustomerAdapter";
import AxiosConfig from "../../../module/config/AxiosConfig";
import LoggerModule from "../../../../../../helpers/logger/src/module/LoggerModule";
import Logger from "../../../../../../helpers/logger/src/module/Logger";
import * as nock from "nock";
import TechnicalException from "../../../../../../../entities/src/module/common/exception/TechnicalException";

describe("CustomerAdapter", () => {
    let customerAdapter: CustomerAdapter;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CustomerAdapter, AxiosConfig, LoggerModule, Logger],
        }).compile();
        customerAdapter = module.get<CustomerAdapter>(CustomerAdapter);
    });

    afterEach(() => {
        nock.cleanAll();
    });

    describe("findByRFC", () => {
        it("should retrieve a customer with rfc", async () => {
            const mockAPI = nock(process.env.API_BASE_URL)
                .post(process.env.API_SEARCH_INTERLOCUTOR)
                .reply(200, {
                    searchInterlocutorResBO: {
                        status: "C",
                        code: "200",
                        response: "Service executed successfully.",
                        people: [
                            {
                                bpId: "0000000142",
                                clientId: "000906673",
                                bpRolId: "ZFS001",
                                groupId: "Z01",
                                rfc: "LEMI8301061",
                                curp: "",
                                name1: "IVAN",
                                name2: "PAOLA",
                                lastname1: "LEMOS",
                                lastname2: "MINCHACA",
                                nameCompany: "",
                                dateBirth: "1983-01-06",
                                placeBirth: "",
                            },
                        ],
                    },
                });
            const customer = await customerAdapter.findByRFC("LEMI8301061");
            expect(customer.getRfc()).toEqual("LEMI8301061");
            expect(customer.getName()).toEqual("IVAN");
            expect(customer.getSecondName()).toEqual("PAOLA");
            expect(customer.getLastName()).toEqual("LEMOS");
            expect(customer.getSecondLastName()).toEqual("MINCHACA");
            expect(customer.getId()).toEqual("000906673");
            mockAPI.isDone();
        });
    });

    describe("findByCurp", () => {
        it("should retrieve a customer with curp", async () => {
            const mockAPI = nock(process.env.API_BASE_URL)
                .post(process.env.API_SEARCH_INTERLOCUTOR)
                .reply(200, {
                    searchInterlocutorResBO: {
                        status: "C",
                        code: "200",
                        response: "Service executed successfully.",
                        people: [
                            {
                                bpId: "0000000142",
                                clientId: "000906673",
                                bpRolId: "ZFS001",
                                groupId: "Z01",
                                rfc: "",
                                curp: "any-curp",
                                name1: "IVAN",
                                name2: "PAOLA",
                                lastname1: "LEMOS",
                                lastname2: "MINCHACA",
                                nameCompany: "",
                                dateBirth: "1983-01-06",
                                placeBirth: "",
                            },
                        ],
                    },
                });
            const customer = await customerAdapter.findByCurp("any-curp");
            expect(customer.getCurp()).toEqual("any-curp");
            expect(customer.getName()).toEqual("IVAN");
            expect(customer.getSecondName()).toEqual("PAOLA");
            expect(customer.getLastName()).toEqual("LEMOS");
            expect(customer.getSecondLastName()).toEqual("MINCHACA");
            expect(customer.getId()).toEqual("000906673");
            mockAPI.isDone();
        });
    });

    describe("findById", () => {
        it("should retrieve a customer with id", async () => {
            const mockAPI = nock(process.env.API_BASE_URL)
                .post(process.env.API_SEARCH_INTERLOCUTOR)
                .reply(200, {
                    searchInterlocutorResBO: {
                        status: "C",
                        code: "200",
                        response: "Service executed successfully.",
                        people: [
                            {
                                bpId: "0000000142",
                                clientId: "000906673",
                                bpRolId: "ZFS001",
                                groupId: "Z01",
                                rfc: "",
                                curp: "any-curp",
                                name1: "IVAN",
                                name2: "PAOLA",
                                lastname1: "LEMOS",
                                lastname2: "MINCHACA",
                                nameCompany: "",
                                dateBirth: "1983-01-06",
                                placeBirth: "",
                            },
                        ],
                    },
                });
            const customer = await customerAdapter.findById("000906673");
            expect(customer.getId()).toEqual("000906673");
            expect(customer.getName()).toEqual("IVAN");
            expect(customer.getSecondName()).toEqual("PAOLA");
            expect(customer.getLastName()).toEqual("LEMOS");
            expect(customer.getSecondLastName()).toEqual("MINCHACA");
            expect(customer.getId()).toEqual("000906673");
            mockAPI.isDone();
        });

        it("should retrieve technical exception when api return 500", async () => {
            const mockAPI = nock(process.env.API_BASE_URL)
                .post(process.env.API_SEARCH_INTERLOCUTOR)
                .reply(500);
            await expect(customerAdapter.findById("000906673")).rejects.toBeInstanceOf(TechnicalException);
            mockAPI.isDone();
        });
        
        it("should retrieve status http 200 when body return error 500", async () => {
            const mockAPI = nock(process.env.API_BASE_URL)
                .post(process.env.API_SEARCH_INTERLOCUTOR)
                .reply(200, {
                    searchInterlocutorResBO: {
                        status: "C",
                        code: "500",
                        response: "Service not available.",
                    },
                });
            const customer = await customerAdapter.findById("000906673");
            expect(customer).toEqual(null);
            mockAPI.isDone();
        });

    });

});
