import {Test, TestingModule} from "@nestjs/testing";
import EncryptorUtilAdapter from "../../module/adapters/EncryptorUtilAdapter";
import TechnicalException from "../../../../../../entities/src/module/common/exception/TechnicalException";
import Logger from "../../../../../helpers/logger/src/module/Logger";
import * as bcrypt from "bcrypt";

describe("EncryptorUtilAdapter", () => {

    let encryptorUtilAdapter: EncryptorUtilAdapter;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EncryptorUtilAdapter, Logger],
        }).compile();
        encryptorUtilAdapter = module.get<EncryptorUtilAdapter>(EncryptorUtilAdapter);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("encrypt", () => {
        it("should encrypted data.", async () => {
            const dataEncrypted = await encryptorUtilAdapter.encrypt("data");
            await expect(encryptorUtilAdapter.compare("data", dataEncrypted)).resolves.toEqual(true);
        });
        it("should retrieve technical exception.", async () => {
            jest.spyOn(bcrypt, 'hash').mockImplementation(() => { throw new Error('Simulated JWT sign error') });
            await expect(encryptorUtilAdapter.encrypt("data")).rejects.toThrow(TechnicalException);
        });
        it("should retrieve technical exception in compare method.", async () => {
            jest.spyOn(bcrypt, 'compare').mockImplementation(() => { throw new Error('Simulated JWT sign error') });
            const dataEncrypted = await encryptorUtilAdapter.encrypt("data");
            await expect(encryptorUtilAdapter.compare("data", dataEncrypted)).rejects.toThrow(TechnicalException);
        });
    });
});
