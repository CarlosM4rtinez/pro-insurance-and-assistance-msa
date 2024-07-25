import {ApiProperty} from "@nestjs/swagger";
import Survey from "../../../../../../../../entities/src/module/entities/survey/Survey";
import QuestionDTO from "./QuestionDTO";

export default class GetSurveyResponseDTO {

    @ApiProperty({ required: true, description: "Unique survey identifier." })
    public id: string;

    @ApiProperty({ required: true, description: "Current version of the survey." })
    public version: string;

    @ApiProperty({ required: true, description: "List of questions to be asked for this survey.", type: () => [QuestionDTO] })
    public questions: QuestionDTO[];

    constructor(survey: Survey) {
        this.id = survey.getId();
        this.version = survey.getVersion();
        this.questions = survey.getQuestions().map(question => new QuestionDTO(question));
    }

}
