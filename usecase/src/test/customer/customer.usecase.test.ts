import {Test, TestingModule} from "@nestjs/testing";
import CustomerUsecase from "../../module/customer/CustomerUsecase";
import ICustomerGateway from "../../../../entities/src/module/entities/customer/gateway/ICustomerGateway";
import Customer from "../../../../entities/src/module/entities/customer/Customer";
import BusinessException from "../../../../entities/src/module/common/exception/BusinessException";

describe("CustomerUsecase", () => {

    let customerUsecase: CustomerUsecase;
    let customerGatewayMock: jest.Mocked<ICustomerGateway>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CustomerUsecase,
                {
                    provide: "ICustomerGateway",
                    useValue: {
                        findByRFC: jest.fn(),
                        findByCurp: jest.fn(),
                        findById: jest.fn(),
                    },
                },
            ],
        }).compile();
        customerUsecase = module.get<CustomerUsecase>(CustomerUsecase);
        customerGatewayMock = module.get<ICustomerGateway>("ICustomerGateway") as jest.Mocked<ICustomerGateway>;
    });

    describe("findByRFC", () => {
        it("should return customer when found", async () => {
            const mockCustomer = new Customer("1", "carlos", "alfredo", "martinez", "villada", "any-rfc-customer", "edas", "1985-02-22", "sample@gmail.com", "M");
            customerGatewayMock.findByRFC.mockResolvedValueOnce(mockCustomer);
            const customer = await customerUsecase.findByRFC("any-rfc-customer");
            expect(customer.getId()).toEqual("1");
            expect(customer.getName()).toEqual("carlos");
            expect(customer.getRfc()).toEqual("any-rfc-customer");
        });
        it("should return customer when is not found", async () => {
            customerGatewayMock.findByRFC.mockResolvedValue(Promise.resolve(null));
            await expect(customerUsecase.findByRFC("any-rfc-customer")).rejects.toThrow(BusinessException);
        });
    });

    describe("findByCurp", () => {
        it("should return customer when found", async () => {
            const mockCustomer = new Customer("1", "carlos", "alfredo", "martinez", "villada", "asas", "any-curp-customer", "1985-02-22", "sample@gmail.com", "M");
            customerGatewayMock.findByCurp.mockResolvedValueOnce(mockCustomer);
            const customer = await customerUsecase.findByCurp("any-curp-customer");
            expect(customer.getId()).toEqual("1");
            expect(customer.getName()).toEqual("carlos");
            expect(customer.getCurp()).toEqual("any-curp-customer");
            expect(customer.getSecondName()).toEqual("alfredo");
            expect(customer.getLastName()).toEqual("martinez");
            expect(customer.getSecondLastName()).toEqual("villada");
            expect(customer.getEmail()).toEqual("sample@gmail.com");
            expect(customer.getGender()).toEqual("M");
            expect(customer.getDateBirth()).toBeDefined();
        });
        it("should return customer when is not found", async () => {
            customerGatewayMock.findByRFC.mockResolvedValue(Promise.resolve(null));
            await expect(customerUsecase.findByCurp("any-curp-customer")).rejects.toThrow(BusinessException);
        });
    });

    describe("findByCurp", () => {
        it("should return customer when found", async () => {
            const mockCustomer = new Customer("109", "carlos", "alfredo", "martinez", "villada", "asfds", "fds", "1985-02-22", "sample@gmail.com", "M");
            customerGatewayMock.findById.mockResolvedValueOnce(mockCustomer);
            const customer = await customerUsecase.findById("109");
            expect(customer.getId()).toEqual("109");
        });
        it("should return customer when is not found", async () => {
            customerGatewayMock.findByRFC.mockResolvedValue(Promise.resolve(null));
            await expect(customerUsecase.findById("any-curp-customer")).rejects.toThrow(BusinessException);
        });
    });
    
});
