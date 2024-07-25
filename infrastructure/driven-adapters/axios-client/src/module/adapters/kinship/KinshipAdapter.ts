import { Injectable } from "@nestjs/common";
import Kinship from "entities/src/module/entities/kinship/Kinship";
import IKinshipGateway from "../../../../../../../entities/src/module/entities/kinship/gateway/IKinshipGateway";
import AxiosConfig from "../../config/AxiosConfig";
import { KinshipTechnicalMessage } from "entities/src/module/entities/kinship/message/KinshipTechnicalMessage";
import { exceptionHandler } from "entities/src/module/common/exception/util/ExceptionUtil";
import ListKinshipResponseDTO from "./dto/ListKinshipResponseDTO";
import ListKinshipRequestDTO from "./dto/ListKinshipRequestDTO";
import KinshipMapper from "./mapper/KinshipMapper";

@Injectable()
export default class KinshipAdapter implements IKinshipGateway {

    private API_GET_KINSHIP: string = process.env.API_GET_KINSHIP;

    constructor(public axiosConfig: AxiosConfig) {}

    async list(): Promise<Kinship[]> {
        try{
            const request = new ListKinshipRequestDTO();
            const responseAPI = await this.axiosConfig.getInstance().post<ListKinshipResponseDTO>(this.API_GET_KINSHIP, request);
            return KinshipMapper.toDomainListEntity(responseAPI.data);
        } catch(error){
            exceptionHandler(KinshipTechnicalMessage.MST_KINSHIP_000, error);
        }
    }
    
}