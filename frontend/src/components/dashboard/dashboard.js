import {Layout} from "../layout";

export class Dashboard {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        Layout.getBalance(this.openNewRoute).then()
    }
}