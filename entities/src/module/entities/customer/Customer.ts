export default class Customer {

    private id: string;
    private name: string;
    private secondName: string;
    private lastName: string;
    private secondLastName: string;
    private rfc: string;
    private curp: string;
    private dateBirth: string;
    private email: string;
    private gender: string;

    constructor(id: string, name: string, secondName: string, lastName: string, secondLastName: string, rfc: string, curp: string, dateBirth: string, email: string, gender: string) {
        this.id = id;
        this.name = name;
        this.secondName = secondName;
        this.lastName = lastName;
        this.secondLastName = secondLastName;
        this.rfc = rfc;
        this.curp = curp;
        this.dateBirth = dateBirth;
        this.email = email;
        this.gender = gender;
    }

    public getId(): string {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getSecondName(): string {
        return this.secondName;
    }

    public getLastName(): string {
        return this.lastName;
    }

    public getSecondLastName(): string {
        return this.secondLastName;
    }

    public getRfc(): string {
        return this.rfc;
    }

    public getCurp(): string {
        return this.curp;
    }

    public getDateBirth(): string {
        return this.dateBirth;
    }

    public getEmail(): string {
        return this.email;
    }

    public getGender(): string {
        return this.gender;
    }
}
