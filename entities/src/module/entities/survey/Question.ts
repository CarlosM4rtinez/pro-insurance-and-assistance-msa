import Answer from "./Answer";

export default class Question {

    private id: string;
    private number: string;
    private description: string;
    private componentType: string;
    private answers: Answer[];

    constructor(id: string, number: string, description: string, componentType: string, answers: Answer[]){
        this.id = id;
        this.number = number;
        this.description = description;
        this.componentType = componentType;
        this.answers = answers;
    }

    public getId(): string {
        return this.id;
    }

    public getNumber(): string {
        return this.number;
    }

    public getDescription(): string {
        return this.description;
    }

    public getComponentType(): string {
        return this.componentType;
    }

    public getAnswers(): Answer[] {
        return this.answers;
    }

}