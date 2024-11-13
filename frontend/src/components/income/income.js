import {Layout} from "../layout";
import {DELETE_INCOME, EDIT_INCOME, GET_CATEGORIES_INCOME} from "../../../config/config";
import {IncomeService} from "../service/income-service";

export class Income {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        Layout.getBalance(this.openNewRoute).then();

        this.getCards().then();
    }

    async getCards() {
        const response = await IncomeService.getIncomes(GET_CATEGORIES_INCOME);

        if (response.error) {
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        this.showCards(response.incomes)
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
                    <a href="${EDIT_INCOME}/edit?id=${item.id}" class="btn btn-primary">Редактировать</a>
                    <a href="${DELETE_INCOME}?id=${item.id}" class="delete-card btn btn-danger"

                       >Удалить</a>
                </div>
            `;
            newCard.before(cardElement);
        });
    }
}