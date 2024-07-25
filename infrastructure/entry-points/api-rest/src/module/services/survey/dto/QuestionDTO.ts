import { ApiProperty } from "@nestjs/swagger";
import Question from "../../../../../../../../entities/src/module/entities/survey/Question";
import AnswerDTO from "./AnswerDTO";

export default class QuestionDTO {

    @ApiProperty({ required: true, description: "Unique question identifier." })
    public id: string;

    @ApiProperty({ required: true, description: "" })
    public number: string;

    @ApiProperty({ required: true, description: "" })
    public description: string;

    @ApiProperty({ required: true, description: "" })
    public componentType: string;

    @ApiProperty({ required: true, type: () => [AnswerDTO], description: "Answer options to the question." })
    public answers: AnswerDTO[];

    constructor(question: Question){
        this.id = question.getId();
        this.number = question.getNumber();
        this.description = question.getDescription();
        this.componentType = question.getComponentType();
        this.answers = question.getAnswers().map(answer => new AnswerDTO(answer));
    }

}