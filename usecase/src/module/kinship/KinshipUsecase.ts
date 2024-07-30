import { Inject, Injectable } from "@nestjs/common";
import Kinship from "entities/src/module/entities/kinship/Kinship";
import IKinshipGateway from "entities/src/module/entities/kinship/gateway/IKinshipGateway";

@Injectable()
export default class KinshipUsecase {

    constructor(@Inject("IKinshipGateway") public kinshipGateway: IKinshipGateway){}

    public async list(): Promise<Kinship[]> {
        const list: Kinship[] = await this.kinshipGateway.list();
        return list;
    }

}