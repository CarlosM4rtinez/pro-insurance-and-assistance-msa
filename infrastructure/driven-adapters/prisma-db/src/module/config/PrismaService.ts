import {Injectable, OnModuleInit} from "@nestjs/common";
import {PrismaClient} from "@prisma/client";

@Injectable()
export default class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super({
            log: process.env.NODE_ENV.trim() === "debug" ? ["query"] : [],
        });
    }

    async onModuleInit() {
        await this.$connect();
    }
}
