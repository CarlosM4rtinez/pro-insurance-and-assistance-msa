import { ApiProperty } from "@nestjs/swagger";
import Answer from "../../../../../../../../entities/src/module/entities/survey/Answer";

export default class AnswerDTO {

    @ApiProperty({ required: true, description: "" })
    id: string;

    @ApiProperty({ required: true, description: "Detail of the response option." })
    description: string;

    @ApiProperty({ required: true, description: "" })
    selection: boolean; 

    @ApiProperty({ required: true, description: "Type of response. [OB = checkbox,]" })
    componentType: string;

    @ApiProperty({ required: true, description: "" })
    freeText: string;

    @ApiProperty({ required: true, description: "" })
    valueId: string;

    constructor(answer: Answer){
        this.id = answer.getId();
        this.description = answer.getDescription();
        this.selection = answer.getSelection();
        this.componentType = answer.getComponentType();
        this.freeText = answer.getFreeText();
        this.valueId = answer.getValueId();
    }

}