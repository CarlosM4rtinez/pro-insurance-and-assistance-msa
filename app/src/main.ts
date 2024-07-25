import {NestFactory} from "@nestjs/core";
import AppModule from "./config/app.module";
import * as dotenv from "dotenv";
import SwaggerConfig from "../../infrastructure/entry-points/api-rest/src/module/SwaggerConfig";
import {INestApplication} from "@nestjs/common";

async function bootstrap(): Promise<INestApplication> {
    const app = await NestFactory.create(AppModule);
    loadEnvironmentVariables();
    loadSwagger(app);
    await app.listen(definePort());
    return app;
  }

function loadEnvironmentVariables(): void {
    if (process.env.NODE_ENV?.trim().toLowerCase() === "local") {
        dotenv.config();
    }
}

function loadSwagger(app: INestApplication): SwaggerConfig {
    return new SwaggerConfig(app);
}

function definePort(): string {
    return process.env.SERVER_PORT ? process.env.SERVER_PORT : "3000";
}

export default bootstrap();
