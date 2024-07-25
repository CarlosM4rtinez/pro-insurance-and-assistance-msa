export default class Answer {

    private id: string;
    private description: string;
    private selection: boolean; 
    private componentType: string;
    private freeText: string;
    private valueId: string;

    constructor(id: string, description: string, selection: boolean, componentType: string, freeText: string, valueId: string){
        this.id = id;
        this.description = description;
        this.selection = selection;
        this.componentType = componentType;
        this.freeText = freeText;
        this.valueId = valueId;
    }

    public getId(): string {
        return this.id;
    }

    public getDescription(): string {
        return this.description;
    }

    public getSelection(): boolean {
        return this.selection;
    }

    public getComponentType(): string {
        return this.componentType;
    }

    public getFreeText(): string {
        return this.freeText;
    }

    public getValueId(): string {
        return this.valueId;
    }

}