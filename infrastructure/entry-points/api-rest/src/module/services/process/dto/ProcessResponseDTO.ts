import {ApiProperty} from "@nestjs/swagger";
import Process from "entities/src/module/entities/process/Process";

export default class ProcessResponseDTO {


    @ApiProperty({required: true, description: "Key that identifies the process."})
    key: string;

    @ApiProperty({required: true, description: "Validity in hours that will have the key of the process."})
    duration: string;

    @ApiProperty({required: true})
    createdAt: Date;

    @ApiProperty({required: true})
    updatedAt: Date;

    @ApiProperty({required: true})
    channel: string;

    @ApiProperty({required: true})
    customer: string;

    constructor(process: Process) {
        this.key = process.getKey();
        this.duration = process.getDuration();
        this.createdAt = process.getCreatedAt();
        this.updatedAt = process.getUpdatedAt();
        this.channel = process.getChannel().getAcronym();
        this.customer = process.getCustomer();
    }

}
