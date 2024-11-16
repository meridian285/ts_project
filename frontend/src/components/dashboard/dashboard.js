import {Layout} from "../layout";

export class Dashboard {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        Layout.getBalance(this.openNewRoute).then();

        this.showDiagram();
        this.content();
    }

    showDiagram() {
        const incomeDiagram = document.getElementById('income-diagram');
        let incomeData = [12, 19, 3, 5, 20, 3]

        new Chart(incomeDiagram, {
            type: 'pie',
            responsive: true,
            maintainAspectRatio: false,
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
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
        const expensesData = [12, 19, 3, 5, 20, 3];

        new Chart(expensesDiagram, {
            type: 'pie',
            responsive: true,
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
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