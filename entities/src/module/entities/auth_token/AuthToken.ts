export default class AuthToken {
    
    private token: string;
    private duration: string;

    constructor(token: string, duration: string) {
        this.token = token;
        this.duration = duration;
    }

    getToken(): string {
        return this.token;
    }

    getDuration(): string {
        return this.duration;
    }

}
