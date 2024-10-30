import config, {LOGIN, LOGOUT, POST} from "../../../config/config";
import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";

export class Logout {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return this.openNewRoute(LOGIN);
        }

        this.logout().then();
    }

    async logout() {
        await HttpUtils.request(LOGOUT, POST, {
            refreshToken: localStorage.getItem(AuthUtils.refreshTokenKey)
        });

        //Удаляются из localStorage токены и инфо
        AuthUtils.removeAuthInfo();

        this.openNewRoute('/login');
    }
}