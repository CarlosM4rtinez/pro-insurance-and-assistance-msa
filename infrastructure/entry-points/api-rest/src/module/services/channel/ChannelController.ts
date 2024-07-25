import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import ChannelUsecase from "../../../../../../../usecase/src/module/channel/ChannelUsecase";
import CreateChannelRequestDTO from "./dto/CreateChannelRequestDTO";
import {ApiBearerAuth, ApiConflictResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import ErrorDTO from "../../commons/dto/ErrorDTO";
import ChannelResponseDTO from "./dto/ChannelResponseDTO";

@ApiTags("Channel")
@ApiBearerAuth()
@Controller("/api/v1/channel/")
export default class ChannelController {
    
    constructor(private readonly channelUsecase: ChannelUsecase) {}

    @Get()
    @ApiOperation({summary: "List channels.", description: "list of channels."})
    @ApiOkResponse({description: "List of registered channels.", type: [ChannelResponseDTO]})
    @ApiConflictResponse({description: "A business exception has occurred.", type: ErrorDTO})
    @ApiInternalServerErrorResponse({description: "A technical exception has occurred.", type: ErrorDTO})
    async list() {
        const channels = await this.channelUsecase.list();
        return channels.map((channel) => new ChannelResponseDTO(channel));
    }

    @Get(":acronym")
    @ApiOperation({summary: "Find channel by acronym.", description: "Find a channel by acronym."})
    @ApiOkResponse({description: "Channel information found.", type: ChannelResponseDTO})
    @ApiConflictResponse({description: "A business exception has occurred.", type: ErrorDTO})
    @ApiInternalServerErrorResponse({description: "A technical exception has occurred.", type: ErrorDTO})
    async findByAcronym(@Param("acronym") acronym: string) {
        const channel = await this.channelUsecase.findByAcronym(acronym);
        return new ChannelResponseDTO(channel);
    }

    @Post()
    @ApiOperation({summary: "Create channel.", description: "Create a new channel."})
    @ApiCreatedResponse({description: "Channel successfully created.", type: ChannelResponseDTO})
    @ApiConflictResponse({description: "A business exception has occurred.", type: ErrorDTO})
    @ApiInternalServerErrorResponse({description: "A technical exception has occurred.", type: ErrorDTO})
    async create(@Body() request: CreateChannelRequestDTO) {
        const {name, acronym, secretKey} = request;
        const secretKeyDecoded = Buffer.from(secretKey, 'base64').toString('utf-8');
        const channelCreated = await this.channelUsecase.create(name, acronym, secretKeyDecoded);
        return new ChannelResponseDTO(channelCreated);
    }

}
