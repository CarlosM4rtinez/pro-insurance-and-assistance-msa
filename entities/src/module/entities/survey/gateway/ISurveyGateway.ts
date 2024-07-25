import Survey from "../Survey";

export default interface ISurveyGateway {
    save(survey: Survey): Promise<void>;
    findById(surveyId: string): Promise<Survey>;
}
