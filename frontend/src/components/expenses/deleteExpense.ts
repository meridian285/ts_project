import {UrlUtils} from "../service/url-utils";
import {EXPENSES} from "../../../config/config";
import {ExpensesService} from "../service/expenses-service";

export class DeleteExpense {
    constructor(openNewRoute) {

        this.openNewRoute = openNewRoute;

        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/');
        }

        this.deleteExpenses(id).then();
    }

    async deleteExpenses(id) {
        const response = await ExpensesService.deleteExpense(id);

        if (response.error) {
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        return this.openNewRoute(EXPENSES);
    }
}