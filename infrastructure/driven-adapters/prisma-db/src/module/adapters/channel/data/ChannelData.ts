import Channel from "../../../../../../../../entities/src/module/entities/channel/Channel";

export default class ChannelData {

    id: number;
    name: string;
    acronym: string;
    secretKey: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(channel: Channel) {
        this.id = channel.getId();
        this.name = channel.getName();
        this.acronym = channel.getAcronym();
        this.secretKey = channel.getSecretKey();
        this.createdAt = channel.getCreatedAt();
        this.updatedAt = channel.getUpdatedAt();
    }

}
