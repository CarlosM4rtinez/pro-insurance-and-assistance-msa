import Channel from "../channel/Channel";

export default class Process {

    private id: number;
    private key: string;
    private duration: string;
    private createdAt: Date;
    private updatedAt: Date;
    private channel: Channel;
    private customer: string;

    constructor(id: number, key: string, duration: string, createdAt: Date, updatedAt: Date, channel: Channel, customer: string) {
        this.id = id;
        this.key = key;
        this.duration = duration;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.channel = channel;
        this.customer = customer;
    }

    public getId(): number {
        return this.id;
    }

    public getKey(): string {
        return this.key;
    }

    public getDuration(): string {
        return this.duration;
    }

    public getChannel(): Channel {
        return this.channel;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public getCustomer(): string {
        return this.customer;
    }

}
