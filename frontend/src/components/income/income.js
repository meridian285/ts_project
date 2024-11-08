import {Layout} from "../layout";
import {HttpUtils} from "../../utils/http-utils";
import {DELETE_INCOME, EDIT_INCOME, GET, GET_CATEGORIES_INCOME} from "../../../config/config";

export class Income {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        Layout.getBalance(this.openNewRoute).then();

        this.getCards().then();
    }

    async getCards() {
        const result = await HttpUtils.request(GET_CATEGORIES_INCOME, GET, true);

        console.log(result.response)

        this.showCards(result.response)
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
                    <a href="${EDIT_INCOME}" class="btn btn-primary">Редактировать</a>
                    <a href="${DELETE_INCOME}" class="delete-card btn btn-danger" data-bs-toggle="modal"
                       data-bs-target="#exampleModal">Удалить</a>
                </div>
            `;
            newCard.before(cardElement);
        });
    }
}