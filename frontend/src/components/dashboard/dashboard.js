import {HttpUtils} from "../../utils/http-utils";
import {BALANCE, GET} from "../../../config/config";

export class Dashboard {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.getBalance().then();

    }

    async getBalance() {
        const response = await HttpUtils.request(BALANCE, GET, true)

        if (response.error) {
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }
    }
}