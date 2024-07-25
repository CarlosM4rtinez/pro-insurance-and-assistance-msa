import Question from "./Question";

export default class Survey {
    
    private id: string;
    private version: string;
    private questions: Question[];

    constructor(id: string, version: string, questions: Question[]) {
        this.id = id;
        this.questions = questions;
        this.version = version;
    }

    public getId(): string {
        return this.id;
    }

    public getQuestions(): Question[] {
        return this.questions;
    }

    public getVersion(): string {
        return this.version;
    }

}
