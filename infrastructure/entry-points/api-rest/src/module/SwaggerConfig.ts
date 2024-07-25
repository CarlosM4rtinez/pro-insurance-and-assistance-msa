import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

export default class SwaggerConfig {

    constructor(app: any) {
        SwaggerModule.setup("api", app, this.createDocument(app), this.customerOptions());
    }

    createDocument(app: any) {
        return SwaggerModule.createDocument(app, this.setupSwagger());
    }

    setupSwagger() {
        return new DocumentBuilder()
            .setTitle(process.env.MICROSERVICE_NAME)
            .setDescription(process.env.MICROSERVICE_DESCRIPTION)
            .setVersion("1.0")
            .addBearerAuth()
            .addServer(process.env.MICROSERVICE_BASE_URL)
            .build();
    }

    customerOptions() {
        return {
            swaggerOptions: {
                jsonEditor: true,
            },
            swaggerUrl: '/api-json',
            swaggerUiOptions: {
                docExpansion: "list",
                filter: true,
                showRequestDuration: true,
            },
        };
    }

}
