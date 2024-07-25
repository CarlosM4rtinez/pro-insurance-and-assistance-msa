import {v4 as uuidv4} from "uuid";

export default class GetSurveyRequestDTO {

    surveyRequestBO: SurveyRequestBO;

    constructor(surveyId: string) {
        const applicationId = process.env.API_APPLICATION;
        const processId = uuidv4();
        this.surveyRequestBO = new SurveyRequestBO(applicationId, processId, surveyId);
    }
}

class SurveyRequestBO {
    constructor(
        public applicationId: string, 
        public processId: string, 
        public surveyId: string
    ) {}
}
