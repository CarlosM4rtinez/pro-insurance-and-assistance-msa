import Kinship from "entities/src/module/entities/kinship/Kinship";
import ListKinshipResponseDTO from "../dto/ListKinshipResponseDTO";

export default class KinshipMapper {

    public static toDomainListEntity(responseAPI: ListKinshipResponseDTO): Kinship[] {
        if(!responseAPI?.genericCatalogResBO?.catalog) return null;
        const listCatalogDTO = responseAPI.genericCatalogResBO.catalog;
        return listCatalogDTO.map((catalogDTO) => new Kinship(catalogDTO.catalogId, catalogDTO.catalogDescription));
    }
}
