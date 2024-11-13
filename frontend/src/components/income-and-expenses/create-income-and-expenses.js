import {Layout} from "../layout";

export class CreateIncomeAndExpenses {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;


        Layout.getBalance(this.openNewRoute).then()
    }
}