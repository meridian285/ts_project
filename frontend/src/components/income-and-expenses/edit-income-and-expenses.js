import {Layout} from "../layout";

export class EditIncomeAndExpenses {
    constructor(openNewRoute) {
        new Layout();
        this.openNewRoute = openNewRoute;


        Layout.getBalance(this.openNewRoute).then()
    }
}