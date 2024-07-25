export default class Channel {
    
    private id: number;
    private name: string;
    private acronym: string;
    private secretKey: string;
    private createdAt: Date;
    private updatedAt: Date;

    constructor(name: string, acronym: string, secretKey?: string, id?: number, createdAt?: Date, updatedAt?: Date) {
        this.id = id;
        this.name = name;
        this.acronym = acronym;
        this.secretKey = secretKey;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getAcronym(): string {
        return this.acronym;
    }

    getSecretKey(): string {
        return this.secretKey;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }
}
