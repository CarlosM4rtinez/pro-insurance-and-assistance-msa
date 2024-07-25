import Customer from "../Customer";

export default interface ICustomerGateway {
    findByRFC(rfc: string): Promise<Customer>;
    findByCurp(curp: string): Promise<Customer>;
    findById(id: string): Promise<Customer>;
}