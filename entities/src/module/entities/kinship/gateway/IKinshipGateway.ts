import Kinship from "../Kinship";

export default interface IKinshipGateway {
    list(): Promise<Kinship[]>;
}