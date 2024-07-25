import Bank from "../../../../../../../../entities/src/module/entities/bank/Bank";
import GetBanksResponseDTO from "../dto/GetBanksResponseDTO";

export default class BankMapper {

    public static toModel(data: GetBanksResponseDTO): Bank[] {
        if (!data?.banksResBO?.banks) return [];
        const listBanksApi = data.banksResBO.banks;
        return listBanksApi.map(bankApi => new Bank(bankApi.bankId, bankApi.bankName));
    }
}
