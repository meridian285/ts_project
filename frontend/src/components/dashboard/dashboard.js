import {Layout} from "../layout";
import {DateUtils} from "../../utils/date-utils";
import {OperationsService} from "../service/operations-service";

export class Dashboard {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.table = document.getElementById('dataTable');
        this.startDateInput = document.getElementById('startDate');
        this.endDateInput = document.getElementById('endDate');

        Layout.getBalance(this.openNewRoute).then();

        this.content();

        let date = null;
        const dateInterval = document.querySelectorAll('.select-interval');
        dateInterval.forEach(item => {
            item.addEventListener('click', () => {
                if (item.classList.contains('active')) {
                    switch (item.id) {
                        case 'today':
                            date = DateUtils.today();
                            break;
                        case  'week':
                            date = DateUtils.lastWeekInterval();
                            break;
                        case 'month':
                            date = DateUtils.lastMothInterval();
                            break;
                        case 'year':
                            date = DateUtils.lastYearInterval();
                            break;
                        case 'all-time':
                            date = DateUtils.allTimeInterval();
                            break;
                        case 'interval':
                            date = DateUtils.selectInterval(this.startDateInput.value, this.endDateInput.value);
                            break;
                    }
                }
                this.getData(date).then();
            })
        })

        this.getData({dateFrom: new Date().toISOString().slice(0, 10), dateTo: new Date().toISOString().slice(0, 10)}).then();
    }

    async getData(date) {
        const interval = `?period=interval&dateFrom=${date.dateFrom}&dateTo=${date.dateTo}`;

        const response = await OperationsService.getOperationWithFilter(interval);

        if (response.error) {
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        this.showDiagram(response.operations);
    }



    showDiagram(data) {

        let incomeData = [];
        let incomeDataName = [];
        let expensesData = [];
        let expensesDataName = [];

        data.forEach(item => {
            if (item.type === 'expense') {
                expensesData.push(item.amount)
                expensesDataName.push(item.category)
            } else {
                incomeData.push(item.amount)
                incomeDataName.push(item.category)
            }
        })

        const incomeDiagram = document.getElementById('income-diagram');

        new Chart(incomeDiagram, {
            type: 'pie',
            responsive: true,
            maintainAspectRatio: false,
            data: {
                labels: incomeDataName,
                datasets: [{
                    label: 'Временные данные',
                    data: incomeData,
                    borderWidth: 1
                }]
            },
            options: {

                plugins: {
                    title: {
                        display: true,
                        text: 'Доходы',
                        color: '#290661',
                        font: {
                            size: 28
                        }
                    }
                }
            }
        });

        const expensesDiagram = document.getElementById('expenses-diagram');

        new Chart(expensesDiagram, {
            type: 'pie',
            responsive: true,
            data: {
                labels: expensesDataName,
                datasets: [{
                    label: 'Временные данные',
                    data: expensesData,
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,

                plugins: {
                    title: {
                        display: true,
                        text: 'Расходы',
                        color: '#290661',
                        font: {
                            size: 28
                        }
                    }
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        boxWidth: 80,
                        fontColor: 'black'
                    }
                },
            }
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