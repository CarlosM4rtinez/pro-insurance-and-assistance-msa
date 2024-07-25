import AnswerDTO from "./AnswerDTO";

export default class QuestionDTO {
    
    constructor(
        public id: string, 
        public numberQuestion: string, 
        public description: string, 
        public componentType: string,
        public answers: AnswerDTO[]
    ){}

}