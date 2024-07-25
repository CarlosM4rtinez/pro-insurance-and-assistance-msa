export default class ListKinshipResponseDTO {
    constructor(
        public genericCatalogResBO: GenericCatalogResBO
    ){}
}

class GenericCatalogResBO {
    constructor(
        public status: string,
        public code: string,
        public response: string,
        public catalog: CatalogDTO[]
    ){}
}

class CatalogDTO {
    constructor(
        public catalogId: string,
        public catalogDescription: string
    ){}
}