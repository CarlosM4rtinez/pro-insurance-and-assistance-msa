import Channel from "../../channel/Channel";
import Customer from "../../customer/Customer";
import Process from "../Process";

export default interface IProcessRepository {
    save(customer: Customer, channel: Channel, duration: string): Promise<Process>;
    findByKey(key: string): Promise<Process>;
}
