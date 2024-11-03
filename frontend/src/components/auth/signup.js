import {LOGIN, POST, SIGNUP} from "../../../config/config";
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

        this.fields = [
            {
                name: 'fullName',
                id: 'fullNameInput',
                element: null,
                regex: /^([А-ЯЁ][а-яё]{1,23})\s([А-ЯЁ][а-яё]{1,23})$/,
                valid: false,
            },
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
                regex: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
                valid: false,
            },
            {
                name: 'password',
                id: 'repeatPasswordInput',
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
        });

        document.getElementById('process-button').addEventListener('click', this.signUp.bind(this));
    }

    validateField(field, element) {
        if (!element.value || !element.value.match(field.regex)) {
            element.classList.remove('is-valid');
            element.classList.add('is-invalid');
            field.valid = false;
        } else {
            element.classList.remove('is-invalid');
            element.classList.add('is-valid');
            field.valid = true;

            if (field.id === 'repeatPasswordInput') {
                const repeatPasswordInput = this.fields.find(item => item.id === 'repeatPasswordInput');
                const passwordInput = this.fields.find(item => item.id === 'passwordInput');
                if (repeatPasswordInput.element.value !== '' && repeatPasswordInput.element.value === passwordInput.element.value) {
                    element.classList.remove('is-invalid');
                    element.classList.add('is-valid');
                    field.valid = true;
                } else {
                    element.classList.remove('is-valid');
                    element.classList.add('is-invalid');
                    field.valid = false;
                }
            }
        }

        return field.valid;
    }

    async signUp() {
        this.commonErrorElement.style.display = 'none';
        const arrayName = this.fullNameElement.value.split(' ');
        if (this.validateField) {
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