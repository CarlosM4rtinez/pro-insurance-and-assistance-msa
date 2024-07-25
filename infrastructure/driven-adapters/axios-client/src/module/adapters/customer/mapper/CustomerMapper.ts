import {exceptionHandler} from "../../../../../../../../entities/src/module/common/exception/util/ExceptionUtil";
import {ChannelTechnicalMessage as TechnicalMessage} from "../../../../../../../../entities/src/module/entities/channel/message/ChannelTechnicalMessage";
import Customer from "../../../../../../../../entities/src/module/entities/customer/Customer";
import SearchInterlocutorResponseDTO from "../dto/SearchInterlocutorResponseDTO";

export default class CustomerMapper {
    
    private constructor() {
        exceptionHandler(TechnicalMessage.MST_CHANNEL_001, TechnicalMessage.MST_CHANNEL_001.message);
    }

    public static toModel(data: SearchInterlocutorResponseDTO): Customer {
        if (!data?.searchInterlocutorResBO?.people) return null;
        const dataCustomer = data.searchInterlocutorResBO.people[0];
        return new Customer(
            dataCustomer?.clientId,
            dataCustomer?.name1,
            dataCustomer?.name2,
            dataCustomer?.lastname1,
            dataCustomer?.lastname2,
            dataCustomer?.rfc,
            dataCustomer?.curp,
            dataCustomer?.dateBirth,
            dataCustomer?.email,
            dataCustomer?.gender
        );
    }
}
