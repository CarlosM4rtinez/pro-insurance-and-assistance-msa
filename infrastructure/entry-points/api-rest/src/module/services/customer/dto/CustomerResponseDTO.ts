import {ApiProperty} from "@nestjs/swagger";
import Customer from "entities/src/module/entities/customer/Customer";

export default class CustomerResponseDTO {

    @ApiProperty({ required: true })
    id: string;

    @ApiProperty({ required: true })
    name: string;

    @ApiProperty({ required: true })
    secondName: string;

    @ApiProperty({ required: true })
    lastName: string;

    @ApiProperty({ required: true })
    secondLastName: string;

    @ApiProperty({ required: false })
    rfc: string;

    @ApiProperty({ required: false })
    curp: string;

    @ApiProperty({ required: true })
    dateBirth: string;

    @ApiProperty({ required: true })
    email: string;

    @ApiProperty({ required: true })
    gender: string;

    constructor(customer: Customer) {
        this.id = customer.getId();
        this.name = customer.getName();
        this.secondName = customer.getSecondName();
        this.lastName = customer.getLastName();
        this.secondLastName = customer.getSecondLastName();
        this.rfc = customer.getRfc();
        this.curp = customer.getCurp();
        this.dateBirth = customer.getDateBirth();
        this.email = customer.getEmail();
        this.gender = customer.getGender();
    }

}
