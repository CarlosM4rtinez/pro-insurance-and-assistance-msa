import Question from "../../../../../../../../entities/src/module/entities/survey/Question";
import Answer from "../../../../../../../../entities/src/module/entities/survey/Answer";
import AnswerDTO from "../dto/AnswerDTO";
import QuestionDTO from "../dto/QuestionDTO";
import GetSurveyResponseDTO from "../dto/GetSurveyResponseDTO";
import Survey from "../../../../../../../../entities/src/module/entities/survey/Survey";

export default class SurveyMapper {
    
    public static answerToDomainEntity(answerDTO: AnswerDTO): Answer {
        return new Answer(
            answerDTO.id,
            answerDTO.description,
            answerDTO.selection,
            answerDTO.componentType,
            answerDTO.freeText,
            answerDTO.valueId
        );
    }

    public static questionToDomainEntity(questionDTO: QuestionDTO): Question {
        const listAnswers = questionDTO.answers.map(answerDTO => SurveyMapper.answerToDomainEntity(answerDTO));
        return new Question(
            questionDTO.id, 
            questionDTO.numberQuestion, 
            questionDTO.description, 
            questionDTO.componentType, 
            listAnswers
        );
    }

    public static surveyToDomainEntity(getSurveyResponseDTO: GetSurveyResponseDTO): Survey {
        if (!getSurveyResponseDTO?.surveyResponseBO?.questions) return null;
        const questionDTOs = getSurveyResponseDTO.surveyResponseBO?.questions;
        const questions = questionDTOs.map(questionDTO => SurveyMapper.questionToDomainEntity(questionDTO));
        const surveyId = getSurveyResponseDTO.surveyResponseBO?.surveyInfoData?.id;
        const version = getSurveyResponseDTO.surveyResponseBO?.surveyInfoData?.version;
        return new Survey(surveyId, version, questions);
    }

}
