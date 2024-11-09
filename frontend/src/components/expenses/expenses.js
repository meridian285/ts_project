import {Layout} from "../layout";
import {
    DELETE_EXPENSE,
    EDIT_EXPENSES,
    GET_CATEGORIES_EXPENSE,
} from "../../../config/config";
import {ExpensesService} from "../service/expenses-service";

export class Expenses {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;


        Layout.getBalance(this.openNewRoute).then()

        this.getCards().then();
    }

    async getCards() {
        const response = await ExpensesService.getExpenses(GET_CATEGORIES_EXPENSE);

        if (response.error) {
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        this.showCards(response.incomes);
    }

    showCards(getCards) {
        const newCard = document.getElementById('newCard');

        getCards.forEach(item => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.classList.add('h3');
            cardElement.classList.add('p-3');
            cardElement.classList.add('text-purple-dark');
            cardElement.id = `card-${item.id}`;
            cardElement.innerHTML = `
                    ${item.title}
                <div class="action pt-3">
                    <a href="${EDIT_EXPENSES}" class="btn btn-primary">Редактировать</a>
                    <a href="${DELETE_EXPENSE}" class="delete-card btn btn-danger" data-bs-toggle="modal"
                       data-bs-target="#exampleModal">Удалить</a>
                </div>
            `;
            newCard.before(cardElement);
        });
    }
}