import {Layout} from "../layout";

export class CreateOperation {
    constructor(openNewRoute) {
        new Layout();
        this.openNewRoute = openNewRoute;


        Layout.getBalance(this.openNewRoute).then()
    }
}