import {ApiProperty} from "@nestjs/swagger";
import Kinship from "entities/src/module/entities/kinship/Kinship";

export default class KinshipResponseDTO {

    @ApiProperty({required: true, description: "Unique kinship identifier."})
    public id: string;

    @ApiProperty({required: true, description: "Description kinship."})
    public description: string;

    constructor(kinship: Kinship) {
        this.id = kinship.getId();
        this.description = kinship.getDescription();
    }
    
}
