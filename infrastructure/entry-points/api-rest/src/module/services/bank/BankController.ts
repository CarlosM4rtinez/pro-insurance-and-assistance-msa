import {Controller, Get} from "@nestjs/common";
import {ApiBearerAuth, ApiConflictResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import ErrorDTO from "../../commons/dto/ErrorDTO";
import BankUsecase from "../../../../../../../usecase/src/module/bank/BankUsecase";
import BankResponseDTO from "./dto/BankResponseDTO";

@ApiTags("Bank")
@ApiBearerAuth()
@Controller("/api/v1/bank/")
export default class BankController {

    constructor(private readonly bankUsecase: BankUsecase) {}

    @Get()
    @ApiOperation({summary: "List banks.", description: "List all banks."})
    @ApiOkResponse({description: "List banks.", type: [BankResponseDTO]})
    @ApiConflictResponse({description: "Occurs when no Bank can be found.", type: ErrorDTO})
    @ApiInternalServerErrorResponse({description: "A technical exception has occurred.", type: ErrorDTO})
    async list() {
        const listBanks = await this.bankUsecase.list();
        return listBanks.map((bank) => new BankResponseDTO(bank));
    }
    
}
