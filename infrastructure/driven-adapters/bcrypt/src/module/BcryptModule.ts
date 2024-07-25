import {Module} from "@nestjs/common";
import EncryptorUtilAdapter from "./adapters/EncryptorUtilAdapter";

@Module({
    providers: [
        {
            provide: "IEncryptorUtil",
            useClass: EncryptorUtilAdapter,
        },
    ],
    exports: ["IEncryptorUtil"],
})
export default class BcryptModule {}
