import {HttpUtils} from "../../utils/http-utils";
import {GET_CATEGORIES_INCOME, POST} from "../../../config/config";
import {AuthUtils} from "../../utils/auth-utils";

export class CreateIncome {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;


        this.errorMessageElement = document.getElementById('inputName-error');
        this.inputNameElement = document.getElementById('inputName');
        this.createButtonElement = document.getElementById('createIncome');

        this.createButtonElement.addEventListener('click', this.validationForm.bind(this))
    }

    validationForm(e) {
        let isValid = false;
        if (this.inputNameElement.value === '') {
            this.errorMessageElement.classList.add('is-invalid');
            isValid = false;
        } else {
            this.errorMessageElement.classList.remove('is-invalid');
            isValid = true;
        }
        return isValid;
    }

    async getIncome(e) {
        e.preventDefault();

        if (this.validationForm()) {

            const response = await HttpUtils.request(GET_CATEGORIES_INCOME, POST, true, {
                title: this.inputNameElement.value,
            });

            if (response.error) {
                if (response.redirect) {
                    return this.openNewRoute(response.redirect);
                } else if (response.response.message === 'This record already exists') {
                    console.log(response.response.message)
                    console.log('значение поля', this.inputNameElement.value)
                }
                // return response.redirect ? this.openNewRoute(response.redirect) : null;
            }

            if (response)

                document.getElementById('form').reset();
        }
    }
}