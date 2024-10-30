import {AuthUtils} from "../../utils/auth-utils";
import {LOGIN, POST} from "../../../config/config";
import {HttpUtils} from "../../utils/http-utils";

export class Login {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/');
        }

        this.rememberMeElement = document.getElementById('rememberMeChecked');
        this.commonErrorElement = document.getElementById('common-error');

        this.fields = [
            {
                name: 'email',
                id: 'emailInput',
                element: null,
                regex: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                valid: false,
            },
            {
                name: 'password',
                id: 'passwordInput',
                element: null,
                valid: false,
            }
        ];
        const that = this;
        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.addEventListener('change', (event) => {
                that.validateField.call(that, item, event.target);
            });
        })

        document.getElementById('process-button').addEventListener('click', this.login.bind(this));
    }

    validateField(field, element) {
        if (!element.value || !element.value.match(field.regex)) {
            element.classList.add('is-invalid');
            field.valid = false;
        } else {
            element.classList.remove('is-invalid');
            field.valid = true;
        }
        this.validateForm();
    }

    validateForm() {
        return this.fields.every(item => item.valid);
    }

    async login() {
        this.commonErrorElement.style.display = 'none';
        if (this.validateForm) {

            const result = await HttpUtils.request(LOGIN, POST, {
                // email: this.emailElement.value,
                email: this.fields.find( field => field.id === 'emailInput').element.value,
                password: this.fields.find( field => field.id === 'passwordInput').element.value,
                rememberMe: this.rememberMeElement.checked,
            });

            if (result.error || !result.response || (result.response && (!result.response.tokens.accessToken ||
                !result.response.tokens.refreshToken || !result.response.user.id || !result.response.user.name))) {

                this.commonErrorElement.style.display = 'block';
                return;
            }

            // сохраняем данные в localStorage
            AuthUtils.setAuthInfo(result.response.tokens.accessToken, result.response.tokens.refreshToken, {
                id: result.response.user.id,
                name: result.response.user.name,
                lastName: result.response.user.lastName,
            });

            this.openNewRoute('/');
        }
    }
}