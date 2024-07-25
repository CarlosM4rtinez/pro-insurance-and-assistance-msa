import {ApiProperty} from "@nestjs/swagger";

export default class CreateProcessResponseDTO {

    @ApiProperty({required: true, description: "Url to load the process start page."})
    linkStartProcess: string;

    @ApiProperty({required: true, description: "Duration of validity of the url to run the process."})
    duration: string;

    constructor(processStart: any) {
        this.linkStartProcess = processStart.linkStartProcess;
        this.duration = processStart.duration;
    }
    
}
