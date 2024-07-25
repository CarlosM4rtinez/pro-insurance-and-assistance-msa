export default class Kinship {

    private id: string;
    private description: string;


    constructor(id: string, description: string){
        this.id = id;
        this.description = description;
    }

    public getId(): string{
        return this.id;
    }

    public getDescription(): string{
        return this.description;
    }

}