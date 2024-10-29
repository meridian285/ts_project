import {Auth} from "../service/auth";
import config from "../../config/config";

export class Login {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.emailElement = document.getElementById('emailInput');
        this.passwordElement = document.getElementById('passwordInput');
        this.rememberMeElement = document.getElementById('rememberMeChecked');
        this.commonErrorElement = document.getElementById('common-error');

        document.getElementById('process-button').addEventListener('click', this.login.bind(this));
    }

    validateForm() {
        let isValid = true;

        if (this.emailElement.value && this.emailElement.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
            this.emailElement.classList.remove('is-invalid');
        } else {
            this.emailElement.classList.add('is-invalid');
            isValid = false;
        }

        if (this.passwordElement.value) {
            this.passwordElement.classList.remove('is-invalid');
        } else {
            this.passwordElement.classList.add('is-invalid');
            isValid = false;
        }

        return isValid;
    }

    async login() {
        this.commonErrorElement.style.display = 'none';
        if (this.validateForm()) {
            const response = await fetch(config.host + '/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: this.emailElement.value,
                    password: this.passwordElement.value,
                    rememberMe: this.rememberMeElement.checked,
                })
            });

            const result = await response.json();

            if (result.error || !result.tokens.accessToken || !result.tokens.refreshToken || !result.user.id || !result.user.name) {
                this.commonErrorElement.style.display = 'block';
                return;
            }

            // сохраняем данные в localStorage
            localStorage.setItem(Auth.accessTokenKey, result.tokens.accessToken);
            localStorage.setItem(Auth.refreshTokenKey, result.tokens.refreshToken);
            localStorage.setItem(Auth.userInfoKey, JSON.stringify({
                id: result.user.id,
                name: result.user.name,
            }));

            this.openNewRoute('/');
        }
    }
}