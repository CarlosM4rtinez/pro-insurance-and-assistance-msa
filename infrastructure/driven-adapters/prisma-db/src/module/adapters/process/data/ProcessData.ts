import Channel from "entities/src/module/entities/channel/Channel";
import Customer from "entities/src/module/entities/customer/Customer";

export default class ProcessData {

    duration: string;
    channel: number;
    customer: string;

    constructor(customer: Customer, channel: Channel, duration: string) {
        this.duration = duration;
        this.channel = channel.getId();
        this.customer = customer?.getId();
    }
    
}
