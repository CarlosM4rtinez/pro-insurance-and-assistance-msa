import Channel from "../Channel";

export default interface IChannelRepository {
    findByAcronym(acronym: string): Promise<Channel>;
    list(): Promise<Channel[]>;
    findByName(name: string): Promise<Channel>;
    save(channel: Channel): Promise<Channel>;
}
