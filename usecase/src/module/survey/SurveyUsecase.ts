import { Inject, Injectable } from "@nestjs/common";
import Survey from "../../../../entities/src/module/entities/survey/Survey";
import ISurveyGateway from "entities/src/module/entities/survey/gateway/ISurveyGateway";

@Injectable()
export default class SurveyUsecase {

    constructor(@Inject("ISurveyGateway") private readonly surveyGateway: ISurveyGateway){}

    public async getInsuranceAndAssistanceRejection(): Promise<Survey> {
        return await this.surveyGateway.findById(process.env.SURVEY_ID);
    }
    
}