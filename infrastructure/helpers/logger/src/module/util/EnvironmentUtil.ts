export default class EnvironmentUtil {
    static getHost(): string {
        return `http://localhost:${this.getPort()}`;
    }

    static getPort(): string {
        return process.env?.SERVER_PORT || "8080";
    }

    static printAllRequest(): boolean {
        return process.env?.PRINT_ALL_REQUESTS === "true" || false;
    }
}
