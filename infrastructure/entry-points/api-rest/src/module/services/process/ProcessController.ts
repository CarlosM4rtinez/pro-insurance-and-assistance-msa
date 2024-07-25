import {Body, Controller, Get, Param, Post, Req} from "@nestjs/common";
import {ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import ErrorDTO from "../../commons/dto/ErrorDTO";
import ProcessUsecase from "../../../../../../../usecase/src/module/process/ProcessUsecase";
import ProcessResponseDTO from "./dto/ProcessResponseDTO";
import CreateProcessRequestDTO from "./dto/CreateProcessRequestDTO";
import CreateProcessResponseDTO from "./dto/CreateProcessResponseDTO";
import {extractAuthToken} from "../../commons/util/RequestUtil";

@ApiBearerAuth()
@ApiTags("Process")
@Controller("/api/v1/process/")
export default class ProcessController {
    
    constructor(private readonly processUsecase: ProcessUsecase) {}

    @Post()
    @ApiOperation({summary: "Create process start link.", description: "Create process start link."})
    @ApiCreatedResponse({description: "Url with process key created for load the pwa.", type: CreateProcessResponseDTO})
    @ApiConflictResponse({description: "A business exception has occurred.", type: ErrorDTO})
    @ApiInternalServerErrorResponse({description: "A technical exception has occurred.", type: ErrorDTO})
    async create(@Body() requestBody: CreateProcessRequestDTO, @Req() request: Request) {
        const {curp, rfc} = requestBody;
        const authorizationToken = extractAuthToken(request);
        const process = await this.processUsecase.createProcessStartKey(authorizationToken, curp, rfc);
        return new CreateProcessResponseDTO(process);
    }

    @Get("key/:key")
    @ApiOperation({summary: "Find process by key.", description: "Find a process by key."})
    @ApiOkResponse({description: "Process information found.", type: ProcessResponseDTO})
    @ApiConflictResponse({description: "Occurs when no process can be found.", type: ErrorDTO})
    @ApiInternalServerErrorResponse({description: "A technical exception has occurred.", type: ErrorDTO})
    async findByKey(@Param("key") key: string) {
        const process = await this.processUsecase.findByKey(key);
        return new ProcessResponseDTO(process);
    }
}
