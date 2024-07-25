import {Module} from "@nestjs/common";
import ApiRestModule from "../../../infrastructure/entry-points/api-rest/src/module/ApiRestModule";
import UsecaseModule from "./usecase.module";

@Module({
    imports: [UsecaseModule, ApiRestModule],
})
export default class AppModule {}
