import {ApiProperty} from "@nestjs/swagger";
import Channel from "entities/src/module/entities/channel/Channel";

export default class ChannelResponseDTO {
    
    @ApiProperty({ required: true })
    id: number;

    @ApiProperty({ required: true })
    name: string;

    @ApiProperty({ required: true })
    acronym: string;

    @ApiProperty({ required: true })
    createdAt: Date;

    @ApiProperty({ required: true })
    updatedAt: Date;

    constructor(channel: Channel) {
        this.id = channel.getId()
        this.name = channel.getName();
        this.acronym = channel.getAcronym();
        this.createdAt = channel.getCreatedAt();
        this.updatedAt = channel.getUpdatedAt();
    }
    
}
