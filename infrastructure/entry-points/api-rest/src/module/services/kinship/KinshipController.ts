import {Controller, Get} from "@nestjs/common";
import {ApiBearerAuth, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import ErrorDTO from "../../commons/dto/ErrorDTO";
import kinshipUsecase from "../../../../../../../usecase/src/module/kinship/KinshipUsecase";
import KinshipResponseDTO from "./dto/KinshipResponseDTO";

@ApiTags("Kinship")
@ApiBearerAuth()
@Controller("/api/v1/kinship/")
export default class KinshipController {

    constructor(private readonly kinshipUsecase: kinshipUsecase) {}

    @Get()
    @ApiOperation({summary: "Get list kinships.", description: "Get the data list kinships."})
    @ApiOkResponse({description: "Return list of data kinships.", type: [KinshipResponseDTO]})
    @ApiInternalServerErrorResponse({description: "A technical exception has occurred.", type: ErrorDTO})
    async list() {
        const listKinship = await this.kinshipUsecase.list();
        return listKinship.map(kinship => new KinshipResponseDTO(kinship));;
    }
    
}
