export default class SurveyInfoDataDTO {

    constructor(
        public id: string,
        public textInfo: string,
        public version: string,
        public masterLenguage: string,
        public language: boolean,
        public applicationId: string,
        public valueGuid: string,
        public valueVersion: string,
        public valueVersionInfoText: string,
        public valueXml: string,
        public must: string,
        public notChangeable: string,
        public createdAt: string,
        public createdBy: string,
        public modifiedAt: string,
        public modifiedBy: string,
        public processMode: string,
        public processText: string
    ) {}

}