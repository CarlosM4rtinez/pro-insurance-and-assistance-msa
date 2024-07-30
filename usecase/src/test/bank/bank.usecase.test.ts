import {Test, TestingModule} from "@nestjs/testing";
import BankUsecase from "../../module/bank/BankUsecase";
import IBankGateway from "../../../../entities/src/module/entities/bank/gateway/IBankGateway";
import Bank from "../../../../entities/src/module/entities/bank/Bank";

describe("BankUsecase", () => {

    let bankUsecase: BankUsecase;
    let bankGatewayMock: jest.Mocked<IBankGateway>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BankUsecase,
                {
                    provide: "IBankGateway",
                    useValue: {
                        list: jest.fn()
                    }
                }
            ],
        }).compile();
        bankUsecase = module.get<BankUsecase>(BankUsecase);
        bankGatewayMock = module.get<IBankGateway>("IBankGateway") as jest.Mocked<IBankGateway>;
    });

    describe("list", () => {
        it("should return list channel when found", async () => {
            const mockBank = new Bank("1", "Csb promotor");
            const listMockBank = [ mockBank, mockBank];
            bankGatewayMock.list.mockResolvedValueOnce(listMockBank);
            const list = await bankUsecase.list();
            expect(list.length).toEqual(2);
        });
    });

});
