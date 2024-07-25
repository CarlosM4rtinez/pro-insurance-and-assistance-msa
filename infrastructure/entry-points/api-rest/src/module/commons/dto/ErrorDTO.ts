import { ApiProperty } from "@nestjs/swagger";

export default class ErrorDTO {
    
    @ApiProperty()
    traceId: string;

    @ApiProperty()
    code: string;

    @ApiProperty()
    message: string;

    @ApiProperty()
    reason: string;

    constructor(code: string, message: string, detail: string) {
        this.traceId = "1adgfds-asdfv-asdfgh-asdfgh";
        this.code = code;
        this.message = message;
        this.reason = detail;
    }
    
}
