import config, {LOGIN, POST, SIGNUP} from "../../../config/config";
import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";

export class SignUp {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        if (AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            return this.openNewRoute('/');
        }

        this.fullNameElement = document.getElementById('fullNameInput');
        this.emailElement = document.getElementById('emailInput');
        this.passwordElement = document.getElementById('passwordInput');
        this.repeatPasswordElement = document.getElementById('repeatPasswordInput');
        this.commonErrorElement = document.getElementById('common-error');

        document.getElementById('process-button').addEventListener('click', this.signUp.bind(this));
    }

    validateForm() {
        let isValid = true;

        //проверка поля ФИО
        if (this.fullNameElement.value) {
            this.fullNameElement.classList.remove('is-invalid');
        } else {
            this.fullNameElement.classList.add('is-invalid');
            isValid = false;
        }

        //проверка почты
        if (this.emailElement.value && this.emailElement.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
            this.emailElement.classList.remove('is-invalid');
        } else {
            this.emailElement.classList.add('is-invalid');
            isValid = false;
        }

        // проверка пароля
        if (this.passwordElement.value && this.passwordElement.value.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{6,})$/)) {
            this.passwordElement.classList.remove('is-invalid');
        } else {
            this.passwordElement.classList.add('is-invalid');
            isValid = false;
        }

        //проверка повторения пароля
        if (this.repeatPasswordElement.value && this.repeatPasswordElement.value && this.passwordElement.value) {
            this.passwordElement.classList.remove('is-invalid');
        } else {
            this.passwordElement.classList.add('is-invalid');
            isValid = false;
        }

        return isValid;
    }

    async signUp() {
        this.commonErrorElement.style.display = 'none';
        const arrayName = this.fullNameElement.value.split(' ');
        if (this.validateForm()) {
            const result = await HttpUtils.request(SIGNUP, POST, {
                name: arrayName[0],
                lastName: arrayName[1],
                email: this.emailElement.value,
                password: this.passwordElement.value,
                passwordRepeat: this.repeatPasswordElement.value,
            });

            console.log(result.response)

            if (result.error || !result.response || (result.response && (!result.response.user.id ||
                !result.response.user.email || !result.response.user.name || !result.response.user.lastName))) {

                this.commonErrorElement.style.display = 'block';
                return;
            }

            this.openNewRoute(LOGIN);
        }
    }














}










// if (this.emailElement.value && this.emailElement.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
//     if (this.emailElement.classList.contains('is-invalid')) {
//         this.emailElement.classList.remove('is-invalid');
//     }
//     this.emailElement.classList.add('is-valid');
// } else {
//     if (this.emailElement.classList.contains('is-valid')) {
//         this.emailElement.classList.remove('is-valid');
//     }
//     this.emailElement.classList.add('is-invalid');
//     isValid = false;
// }