import {HttpUtils} from "../utils/http-utils";
import {BALANCE, GET} from "../../config/config";
import {AuthUtils} from "../utils/auth-utils";

export class Layout {

    static async getBalance(openNewRoute) {
        const userName = document.getElementById('userName');
        const userLastName = document.getElementById('userLastName');
        const balanceElement = document.getElementById('balance');

        const response = await HttpUtils.request(BALANCE, GET, true)

        if (response.error) {
            return response.redirect ? openNewRoute(response.redirect) : null;
        }

        balanceElement.innerText = response.response.balance + '$';

        const userInfo = JSON.parse(AuthUtils.getAuthInfo(AuthUtils.userInfoKey))

        userName.innerText = userInfo.name;
        userLastName.innerText = userInfo.lastName;
    }
}