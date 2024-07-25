export default class SearchInterlocutorResponseDTO {
    constructor(public searchInterlocutorResBO: SearchInterlocutorResBO) {}
}

class SearchInterlocutorResBO {
    constructor(
        public status: string, 
        public code: string, 
        public response: string, 
        public people: Person[]
    ) {}
}

class Person {
    constructor(
        public bpId: string,
        public clientId: string,
        public bpRolId: string,
        public groupId: string,
        public rfc: string,
        public curp: string,
        public name1: string,
        public name2: string,
        public lastname1: string,
        public lastname2: string,
        public nameCompany: string,
        public dateBirth: string,
        public placeBirth: string,
        public countryBirth: Country,
        public nationality: Country,
        public maritalStatus: MaritalStatus,
        public email: string,
        public legalEntity: string,
        public gender: string,
        public levelStudies: LevelStudies,
        public dateCreate: string,
        public FIEL: string,
        public residenceCountry: string,
        public identificationType: string,
        public identificationNumber: string,
        public identificationType2: string,
        public identificationNumber2: string,
        public assignedCountryIdentificationNumber: string,
        public isLocked: boolean,
        public personalInfo: PersonalInfo,
        public isUIFList: boolean,
        public regimenFiscal: RegimenFiscal,
        public isCustomer: boolean
    ) {}
}

class Country {
    constructor(public key: string, public description: string) {}
}

class MaritalStatus {
    constructor(public key: string, public description: string) {}
}

class LevelStudies {
    constructor(public key: string, public description: string) {}
}

class RegimenFiscal {
    constructor(public key: string, public description: string) {}
}

class PersonalInfo {
    constructor(
        public peopleHomeNumber: string, 
        public dependentsEconomicsNumber: string, 
        public ageDependentsEconomics: string
    ) {}
}
