import {IncomeService} from "../service/income-service";
import {UrlUtils} from "../service/url-utils";
import {INCOME} from "../../../config/config";

export class DeleteIncome{
    constructor(openNewRoute) {

        this.openNewRoute = openNewRoute;

        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/');
        }

        this.deleteIncome(id).then();
    }

    async deleteIncome(id) {
        const response = await IncomeService.deleteIncome(id);

        if (response.error) {
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        return this.openNewRoute(INCOME);
    }
}