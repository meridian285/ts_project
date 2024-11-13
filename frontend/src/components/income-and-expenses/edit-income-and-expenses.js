import {Layout} from "../layout";

export class EditIncomeAndExpenses {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;


        Layout.getBalance(this.openNewRoute).then()
    }
}