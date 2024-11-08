import {HttpUtils} from "../../utils/http-utils";
import {BALANCE, GET} from "../../../config/config";
import {AuthUtils} from "../../utils/auth-utils";
import {Layout} from "../layout";

export class Dashboard {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        Layout.getBalance(this.openNewRoute).then()
    }
}