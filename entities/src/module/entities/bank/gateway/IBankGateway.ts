import Bank from "../Bank"

export default interface IBankGateway {
    list(): Promise<Bank[]>;
}