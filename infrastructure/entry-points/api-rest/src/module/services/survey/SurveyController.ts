import {Controller, Get} from "@nestjs/common";
import {ApiBearerAuth, ApiConflictResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import ErrorDTO from "../../commons/dto/ErrorDTO";
import SurveyUsecase from "../../../../../../../usecase/src/module/survey/SurveyUsecase";
import GetSurveyResponseDTO from "./dto/GetSurveyResponseDTO";

@ApiTags("Survey")
@ApiBearerAuth()
@Controller("/api/v1/survey/")
export default class SurveyController {

    constructor(private readonly SurveyUsecase: SurveyUsecase) {}

    @Get("insurance-and-assistance-rejection")
    @ApiOperation({summary: "Get the insurance and assistance survey.", description: "Get the data of the insurance and assistance rejection survey."})
    @ApiOkResponse({description: "Insurance and assistance rejection survey data.", type: GetSurveyResponseDTO})
    @ApiConflictResponse({description: "Occurs when no survey can be found.", type: ErrorDTO})
    @ApiInternalServerErrorResponse({description: "A technical exception has occurred.", type: ErrorDTO})
    async getInsuranceAndAssistanceRejection() {
        const survey = await this.SurveyUsecase.getInsuranceAndAssistanceRejection();
        return new GetSurveyResponseDTO(survey);
    }
    
}
