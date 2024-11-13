import {HttpUtils} from "../../utils/http-utils";
import {GET_CATEGORIES_INCOME, INCOME, POST} from "../../../config/config";

export class CreateIncome {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        // this.errorMessageElement = document.getElementById('inputName-error');
        this.inputNameElement = document.getElementById('inputName');
        this.saveButtonElement = document.getElementById('createIncome');

        this.fields = [
            {
                name: 'input-name',
                id: 'inputName',
                element: null,
                // regex: /[a-zA-Zа-яёА-ЯЁ]*/g,
                regex: /^(|[a-zA-Zа-яёА-ЯЁ][a-zA-Zа-яёА-ЯЁ\s]*)$/,
                valid: false,
            }
        ];

        const that = this;
        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.addEventListener('change', (event) => {
                that.validateField.call(that, item, event.target);
            });

            item.element.addEventListener('blur', (event) => {
                that.validateField.call(that, item, event.target);
            });

            if (item.id === 'inputName') {
                item.element.focus();
            }
        });

        this.saveButtonElement.addEventListener('click', this.getIncome.bind(this))
    }

    validateField(field, element) {
        if (field.id === 'inputName') {
            element.addEventListener('input', function () {
                element.value = element.value.replace(/^\s/, '');
            })
        }

        if (!element.value || element.value === '') {
            element.classList.add('is-invalid');
            field.valid = false;
        } else {
            element.classList.remove('is-invalid');
            field.valid = true;
        }

        return field.valid;
    }

    async getIncome(e) {
        e.preventDefault();

        if (this.validateField) {

            const response = await HttpUtils.request(GET_CATEGORIES_INCOME, POST, true, {
                title: this.inputNameElement.value,
            });

            if (response.error) {
                if (response.redirect) {
                    return this.openNewRoute(response.redirect);
                } else if (response.response.message === 'This record already exists') {
                    // console.log(response.response.message)
                    // console.log('значение поля', this.inputNameElement.value)
                }
                // return response.redirect ? this.openNewRoute(response.redirect) : null;
            }

            document.getElementById('form').reset();
            this.openNewRoute(INCOME);
        }
    }
}