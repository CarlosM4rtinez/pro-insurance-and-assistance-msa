export default class AnswerDTO {
    
    constructor(
        public id: string, 
        public description: string, 
        public selection: boolean, 
        public componentType: string,
        public freeText: string,
        public valueId: string
    ){}

}