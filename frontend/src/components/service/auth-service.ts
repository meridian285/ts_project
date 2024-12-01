import {HttpUtils} from "../../utils/http-utils";
import {LoginDataType} from "../../types/login-data.type";
import {MethodEnum} from "../../types/method-enum";
import {ApiEnum} from "../../types/api.enum";

export class AuthService {

    static isTokenRefreshing = true;

    public static async logIn(data: LoginDataType): Promise<any> {
        const result = await HttpUtils.request(ApiEnum.LOGIN, MethodEnum.POST, false, data);

        if (result.error || !result.response || (result.response && (!result.response.tokens.accessToken ||
            !result.response.tokens.refreshToken || !result.response.user.id || !result.response.user.name))) {
            return false;
        }
        return result.response;
    }

    public static async signUp(data): Promise<any> {
        this.isTokenRefreshing = false;

        const result = await HttpUtils.request(ApiEnum.SIGNUP, MethodEnum.POST, false, data);

        if (result.error || !result.response || (result.response && (!result.response.user.id ||
            !result.response.user.email || !result.response.user.name || !result.response.user.lastName))) {

            return false;
        }

        this.isTokenRefreshing = true;
        return result.response;
    }

    static async logOut(data) {
        await HttpUtils.request(ApiEnum.LOGOUT, MethodEnum.POST, false, data);
    }
}