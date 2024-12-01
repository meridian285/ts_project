import config, {GET, LOGIN} from "../../config/config";
import {AuthUtils} from "./auth-utils";
import {AuthService} from "../components/service/auth-service";
import {MethodEnum} from "../types/method-enum";

export class HttpUtils {
    public static async request(url:string, method = MethodEnum.GET, useAuth:boolean = true, body = null) {

        const result = {
            error: false,
            response: null,
        };

        const params = {
            method: method,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            }
        };

        let token = null;
        if (useAuth) {
            token = AuthUtils.getAuthInfo(AuthUtils.accessTokenKey);
            if (token) {
                params.headers['x-auth-token'] = token;
            }
        }

        if (body) {
            params.body = JSON.stringify(body);
        }

        let response = null;
        try {
            response = await fetch(config.api + url, params);
            result.response = await response.json();
        } catch (e) {
            result.error = true;
            return result;
        }

        if (response.status < 200 || response.status >= 300) {
            result.error = true;
            if (useAuth && response.status === 401) {
                if (!token) {
                    result.redirect = LOGIN;
                } else {
                    const updateTokenResult = await AuthUtils.updateRefreshToken();
                    if (updateTokenResult) {
                        return this.request(url, method, useAuth, body);
                    } else {
                        result.redirect = LOGIN;
                    }
                }
            }
        }
        return result;
    }
}