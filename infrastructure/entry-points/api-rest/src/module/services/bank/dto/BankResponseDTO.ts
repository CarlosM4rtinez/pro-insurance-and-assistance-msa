import {ApiProperty} from "@nestjs/swagger";
import Bank from "entities/src/module/entities/bank/Bank";

export default class BankResponseDTO {

    @ApiProperty({ required: true })
    id: string;

    @ApiProperty({ required: true })
    name: string;

    constructor(bank: Bank) {
        this.id = bank.getId();
        this.name = bank.getName();
    }

}
