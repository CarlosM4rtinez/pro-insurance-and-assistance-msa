export default class ListKinshipRequestDTO {
    genericCatalogReqBO: GenericCatalogReqBO;
    constructor() {
        const applicationId = process.env.API_APPLICATION;
        const catalogName = "CATALOGO-PARENTESCOS";
        this.genericCatalogReqBO = new GenericCatalogReqBO(applicationId, catalogName);
    }
}

class GenericCatalogReqBO {
    constructor(
        public applicationId: string, 
        public catalogName: string
    ) {}
}
