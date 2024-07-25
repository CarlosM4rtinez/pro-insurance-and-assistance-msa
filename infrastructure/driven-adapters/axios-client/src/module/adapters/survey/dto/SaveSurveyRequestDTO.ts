import QuestionDTO from "./QuestionDTO";
import SurveyInfoDataDTO from "./SurveyInfoDataDTO";

export default class SaveSurveyRequestDTO {

    constructor(public saveSurveyRequestBO: SaveSurveyRequestBO){}
}

class SaveSurveyRequestBO {
    constructor(
        public applicationId: string,
        public processId: string,
        public folioApplication: string,
        public customerId: string,
        public questions: QuestionDTO[],
        public surveyInfoData: SurveyInfoDataDTO
    ) {}
}
