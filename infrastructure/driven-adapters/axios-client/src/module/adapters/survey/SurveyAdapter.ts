import {Injectable} from "@nestjs/common";
import AxiosConfig from "../../config/AxiosConfig";
import {exceptionHandler} from "../../../../../../../entities/src/module/common/exception/util/ExceptionUtil";
import {SurveyTechnicalMessage} from "../../../../../../../entities/src/module/entities/survey/message/SurveyTechnicalMessage";
import ISurveyGateway from "../../../../../../../entities/src/module/entities/survey/gateway/ISurveyGateway";
import Survey from "entities/src/module/entities/survey/Survey";
import GetSurveyResponseDTO from "./dto/GetSurveyResponseDTO";
import GetSurveyRequestDTO from "./dto/GetSurveyRequestDTO";
import SurveyMapper from "./mapper/SurveyMapper";

@Injectable()
export default class SurveyAdapter implements ISurveyGateway {

    private API_GET_SURVEY: string = process.env.API_GET_SURVEY;
    private API_SAVE_SURVEY: string = process.env.API_GET_SURVEY;

    constructor(private readonly axiosConfig: AxiosConfig) {}

    public async findById(surveyId: string): Promise<Survey> {
        try {
            const request = new GetSurveyRequestDTO(surveyId);
            const responseAPI = await this.axiosConfig.getInstance().post<GetSurveyResponseDTO>(this.API_GET_SURVEY, request);
            return SurveyMapper.surveyToDomainEntity(responseAPI.data);
        } catch (exception) {
            exceptionHandler(SurveyTechnicalMessage.MST_SURVEY_000, exception);
        }
    }

    public async save(survey: Survey): Promise<void> {
        try {
            const request = new GetSurveyRequestDTO("");
            const responseAPI = await this.axiosConfig.getInstance().post<GetSurveyResponseDTO>(this.API_SAVE_SURVEY, request);
        } catch (exception) {
            exceptionHandler(SurveyTechnicalMessage.MST_SURVEY_001, exception);
        }
    }

}
