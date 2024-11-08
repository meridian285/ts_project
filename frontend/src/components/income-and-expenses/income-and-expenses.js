import {Layout} from "../layout";

export class IncomeAndExpenses {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;


        Layout.getBalance(this.openNewRoute).then()
    }
}