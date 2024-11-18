import {Layout} from "../layout";
import {OperationsService} from "../service/operations-service";
import {EDIT_OPERATION, ROUTE_OPERATIONS} from "../../../config/config";

export class Operations {
    constructor(openNewRoute) {
        new Layout();
        this.openNewRoute = openNewRoute;

        this.table = document.getElementById('dataTable');

        Layout.getBalance(this.openNewRoute).then();

        this.content();

        this.getData().then();
    }

    async getData() {
        let dateFrom = new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString().slice(0, 10);
        console.log(dateFrom)
        let dateTo = new Date().toISOString().slice(0, 10);

        // const interval = `?period=interval&dateFrom=2022-09-12&dateTo=2022-09-13`;
        const interval = `?period=interval&dateFrom=${dateFrom}&dateTo=${dateTo}`;

        const response = await OperationsService.getOperationWithFilter(interval);

        if (response.error) {
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        this.showTable(response.operations)
    }

    showTable(operations) {
        operations.forEach((item, index) => {
            const dateFormat = new Date(item.date);


            let color = 'text-success';
            let typeValue = 'доход';
            if (item.type === 'expense') {
                color = 'text-danger';
                typeValue = 'расход';
            }

            const trElement = document.createElement('tr');
            trElement.innerHTML = `
                    <th scope="row">${index + 1}</th>
                    <td class="${color}">${typeValue}</td>
                    <td>${item.category}</td>
                    <td>${item.amount}$</td>
                    <td>${dateFormat.toLocaleDateString('ru-RU')}</td>
                    <td>${item.comment}</td>
                    <td>
                        <a href="">
                            <img data-bs-toggle="modal" data-bs-target="#exampleModal" role="button"
                                 src="../images/cart.png"
                                 alt="Корзина">
                        </a>
                        
                        <a href="${EDIT_OPERATION}?id=${item.id}">
                            <img href="" src="../images/edit.png" alt="Изменить">
                        </a>
                    </td>
            `;
            this.table.appendChild(trElement);
        });
    }

    content() {
        const selectInterval = document.querySelectorAll('.select-interval');
        // Выбор временного интервала
        selectInterval.forEach(item =>
            item.addEventListener('click', event => {
                if (event) {
                    selectInterval.forEach(item => item.classList.remove('active'));
                    item.classList.add('active');
                }
            })
        )
    }
}