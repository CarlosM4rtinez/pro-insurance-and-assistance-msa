import {Controller, Get, Param} from "@nestjs/common";
import {ApiBearerAuth, ApiConflictResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import ErrorDTO from "../../commons/dto/ErrorDTO";
import CustomerUsecase from "../../../../../../../usecase/src/module/customer/CustomerUsecase";
import CustomerResponseDTO from "./dto/CustomerResponseDTO";

@ApiTags("Customer")
@ApiBearerAuth()
@Controller("/api/v1/customer/")
export default class CustomerController {

    constructor(private readonly customerUsecase: CustomerUsecase) {}

    @Get("rfc/:rfc")
    @ApiOperation({summary: "Find customer by RFC.", description: "Find a customer by RFC."})
    @ApiOkResponse({description: "Customer information found.", type: CustomerResponseDTO})
    @ApiConflictResponse({description: "Occurs when no customer can be found.", type: ErrorDTO})
    @ApiInternalServerErrorResponse({description: "A technical exception has occurred.", type: ErrorDTO})
    async findByRFC(@Param("rfc") rfc: string) {
        const customer = await this.customerUsecase.findByRFC(rfc);
        return new CustomerResponseDTO(customer);
    }

    @Get("curp/:curp")
    @ApiOperation({summary: "Find customer by curp.", description: "Find a customer by curp."})
    @ApiOkResponse({description: "Customer information found.", type: CustomerResponseDTO})
    @ApiConflictResponse({description: "Occurs when no customer can be found.", type: ErrorDTO})
    @ApiInternalServerErrorResponse({description: "A technical exception has occurred.", type: ErrorDTO})
    async findByCurp(@Param("curp") curp: string) {
        const customer = await this.customerUsecase.findByCurp(curp);
        return new CustomerResponseDTO(customer);
    }

    @Get("id/:id")
    @ApiOperation({summary: "Find customer by id.", description: "Find a customer by id."})
    @ApiOkResponse({description: "Customer information found.", type: CustomerResponseDTO})
    @ApiConflictResponse({description: "Occurs when no customer can be found.", type: ErrorDTO})
    @ApiInternalServerErrorResponse({description: "A technical exception has occurred.", type: ErrorDTO})
    async findById(@Param("id") id: string) {
        const customer = await this.customerUsecase.findById(id);
        return new CustomerResponseDTO(customer);
    }

}
