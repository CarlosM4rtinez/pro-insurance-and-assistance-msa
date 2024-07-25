export default class GetBanksResponseDTO {
    constructor(public banksResBO: BanksResBO) {}
}
class BanksResBO {
    constructor(
        public status: string, 
        public code: string, 
        public response: string, 
        public banks: Bank[]
    ) {}
}

class Bank {
    constructor(
        public bankId: string, 
        public bankName: string
    ) {}
}
