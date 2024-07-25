export default class GetBanksRequestDTO {

    banksReqBO: BanksReqBO;

    constructor(applicationId: string) {
        this.banksReqBO = new BanksReqBO(applicationId);
    }

}

class BanksReqBO {
    constructor(public applicationId: string) {
    }
}
