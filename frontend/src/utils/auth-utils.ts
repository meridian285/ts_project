import config, {HEADERS, POST, REFRESH} from "../../config/config";
import {UserInfoType} from "../types/tokens.type";
import {ApiEnum} from "../types/api.enum";

export class AuthUtils {
    static accessTokenKey: string = 'accessToken';
    static refreshTokenKey: string = 'refreshToken';
    static userInfoKey: string = 'userInfo';

    public static setAuthInfo(accessToken: string | null, refreshToken: string | null, userInfo: UserInfoType | null = null): void {
        if (accessToken) {
            localStorage.setItem(this.accessTokenKey, accessToken);
        }
        if (refreshToken) {
            localStorage.setItem(this.refreshTokenKey, refreshToken);
        }
        if (userInfo) {
            localStorage.setItem(this.userInfoKey, JSON.stringify(userInfo));
        }
    }

    public static removeAuthInfo(): void {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
        localStorage.removeItem(this.userInfoKey);
    }

    public static getAuthInfo(key:string | null = null){
        if (key && [this.accessTokenKey, this.refreshTokenKey, this.userInfoKey].includes(key)) {
            return localStorage.getItem(key);
        } else {
            return {
                [this.accessTokenKey]: localStorage.getItem(this.accessTokenKey),
                [this.refreshTokenKey]: localStorage.getItem(this.refreshTokenKey),
                [this.userInfoKey]: localStorage.getItem(this.userInfoKey),
            }
        }
    }

    public static async updateRefreshToken(): Promise<boolean> {
        let result: boolean = false;
        const refreshToken = this.getAuthInfo(this.refreshTokenKey);
        if (refreshToken) {
            const response: Response = await fetch(config.api + ApiEnum.REFRESH, {
                method: POST,
                headers: HEADERS,
                body: JSON.stringify({refreshToken: refreshToken})
            });
            if (response && response.status === 200) {
                const tokens = await response.json();
                if (tokens && !tokens.error) {
                    this.setAuthInfo(tokens.tokens.accessToken, tokens.tokens.refreshToken);
                    result = true;
                }
            }
        }

        if (!result) {
            this.removeAuthInfo();
        }

        return result;
    }
}