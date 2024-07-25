import Survey from "../../../../../../../../entities/src/module/entities/survey/Survey";
import QuestionDTO from "./QuestionDTO";
import SurveyInfoDataDTO from "./SurveyInfoDataDTO";

export default class GetSurveyResponseDTO {

    constructor(public surveyResponseBO: SurveyResponseBO){}

}

class SurveyResponseBO {
    constructor(
        public status: string, 
        public code: string, 
        public response: string, 
        public questions: QuestionDTO[],
        public surveyInfoData: SurveyInfoDataDTO
    ){}
}



