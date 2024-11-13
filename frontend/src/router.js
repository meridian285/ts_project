import {Dashboard} from "./components/dashboard/dashboard";
import {Login} from "./components/auth/login";
import {SignUp} from "./components/auth/signup";
import {IncomeAndExpenses} from "./components/income-and-expenses/income-and-expenses";
import {Income} from "./components/income/income";
import {Expenses} from "./components/expenses/expenses";
import {Logout} from "./components/auth/logout";
import {
    CREATE_EXPENSES,
    CREATE_INCOME, CREATE_INCOME_AND_EXPENSES, DELETE_EXPENSE, DELETE_INCOME, EDIT_EXPENSES,
    EDIT_INCOME, EDIT_INCOME_AND_EXPENSES,
    EXPENSES,
    INCOME,
    INCOME_AND_EXPENSES,
    LOGIN,
    LOGOUT,
    SIGNUP
} from "../config/config";
import {CreateIncome} from "./components/income/createIncome";
import {EditIncome} from "./components/income/editIncome";
import {CreateExpenses} from "./components/expenses/createExpenses";
import {EditExpenses} from "./components/expenses/editIncome";
import {DeleteIncome} from "./components/income/deleteIncome";
import {DeleteExpenses} from "./components/expenses/deleteExpenses";
import {CreateIncomeAndExpenses} from "./components/income-and-expenses/create-income-and-expenses";
import {EditIncomeAndExpenses} from "./components/income-and-expenses/edit-income-and-expenses";
import {FileUtils} from "./utils/file-utils";

export class Router {
    constructor() {
        this.titlePageElement = document.getElementById('title');
        this.contentPageElement = document.getElementById('content');
        this.bootstrapStylesElement = document.getElementById('bootstrap-styles');



        this.initEvents();
        this.routes = [
            {
                route: '/',
                title: 'Dashboard',
                filePathTemplate: '/templates/pages/dashboard.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Dashboard(this.openNewRoute.bind(this));
                },
                styles: ['dashboard.css'],
                scripts: ['bootstrap.bundle.min.js', 'chart.js', 'diagrams.js', 'menu.js'],
            },
            {
                route: LOGIN,
                title: 'Авторизация',
                filePathTemplate: '/templates/pages/auth/login.html',
                useLayout: false,
                load: () => {
                    new Login(this.openNewRoute.bind(this));
                },
                styles: ['auth.css'],
            },
            {
                route: SIGNUP,
                title: 'Регистрация',
                filePathTemplate: '/templates/pages/auth/signup.html',
                useLayout: false,
                load: () => {
                    new SignUp(this.openNewRoute.bind(this));
                },
                styles: ['auth.css'],
            },
            {
                route: LOGOUT,
                load: () => {
                    new Logout(this.openNewRoute.bind(this));
                }
            },
            {
                route: EXPENSES,
                title: 'Расходы',
                filePathTemplate: '/templates/pages/expenses/expenses.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Expenses(this.openNewRoute.bind(this));
                },
                styles: ['expenses.css'],
            },

            {
                route: CREATE_EXPENSES,
                title: 'Создание категории расходов',
                filePathTemplate: '/templates/pages/expenses/create-expenses.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CreateExpenses();
                },
                styles: ['create-expenses.css'],
            },
            {
                route: EDIT_EXPENSES,
                title: 'Редактирование категории расходов',
                filePathTemplate: '/templates/pages/expenses/edit-expenses.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new EditExpenses(this.openNewRoute.bind(this));
                },
                styles: ['edit-expenses.css'],
            },
            {
                route: DELETE_EXPENSE,
                load: () => {
                    new DeleteExpenses();
                }
            },
            {
                route: INCOME,
                title: 'Доходы',
                filePathTemplate: '/templates/pages/income/income.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Income(this.openNewRoute.bind(this));
                },
                styles: ['income.css'],
            },
            {
                route: CREATE_INCOME,
                title: 'Создание категории доходов',
                filePathTemplate: '/templates/pages/income/create-income.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CreateIncome(this.openNewRoute.bind(this));
                },
                styles: ['create-income.css'],
            },
            {
                route: EDIT_INCOME,
                title: 'Редактирование категории доходов',
                filePathTemplate: '/templates/pages/income/edit-income.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new EditIncome(this.openNewRoute.bind(this));
                },
                styles: ['edit-income.css'],
            },
            {
                route: DELETE_INCOME,
                load: () => {
                    new DeleteIncome(this.openNewRoute.bind(this));
                }
            },
            {
                route: INCOME_AND_EXPENSES,
                title: 'Доходы и расходы',
                filePathTemplate: '/templates/pages/income-and-expenses/income-and-expenses.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new IncomeAndExpenses(this.openNewRoute.bind(this));
                },
                styles: ['income-and-expenses.css'],
            },
            {
                route: CREATE_INCOME_AND_EXPENSES,
                title: 'Создание дохода/расхода',
                filePathTemplate: '/templates/pages/income-and-expenses/create-income-and-expenses.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CreateIncomeAndExpenses(this.openNewRoute.bind(this));
                },
                styles: ['create-income-and-expenses.css'],
            },
            {
                route: EDIT_INCOME_AND_EXPENSES,
                title: 'Редактирование дохода/расхода',
                filePathTemplate: '/templates/pages/income-and-expenses/edit-income-and-expenses.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new EditIncomeAndExpenses(this.openNewRoute.bind(this));
                },
                styles: ['edit-income-and-expenses.css'],
            },
        ];
    }

    initEvents() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        window.addEventListener('popstate', this.activateRoute.bind(this));
        document.addEventListener('click', this.clickHandler.bind(this));
    }

    async openNewRoute(url) {
        const currentRout = window.location.pathname;
        history.pushState({}, '', url)
        await this.activateRoute(null, currentRout)
    }

    async clickHandler(e) {
        let element = null;
        if (e.target.nodeName === 'A') {
            element = e.target;
        } else if (e.target.parentNode.nodeName === 'A') {
            element = e.target.parentNode;
        }

        if (element) {
            e.preventDefault();

            const url = element.href.replace(window.location.origin, '');
            if (!url || url === '/#' || url.startsWith('javascript:void(0)')) {
                return
            }

            await this.openNewRoute(url);
        }
    }

    async activateRoute(e, oldRoute = null) {
        if (oldRoute) {
            const currentRoute = this.routes.find(item => item.route === oldRoute);

            if (currentRoute.scripts && currentRoute.scripts.length > 0) {
                currentRoute.scripts.forEach(script => {
                    document.querySelector(`script[src='/js/${script}']`).remove();
                })
            }
            if (currentRoute.styles && currentRoute.styles.length > 0) {
                currentRoute.styles.forEach(style => {
                    document.querySelector(`link[href='/css/${style}']`).remove();
                })
            }
        }

        const urlRout = window.location.pathname;
        const newRoute = this.routes.find(item => item.route === urlRout);


        if (newRoute) {
            if (newRoute.styles && newRoute.styles.length > 0) {
                newRoute.styles.forEach(style => {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = `/css/${style}`;
                    document.head.insertBefore(link, this.bootstrapStylesElement);
                });
            }

            if (newRoute.scripts && newRoute.scripts.length > 0) {
                for (const script of newRoute.scripts) {
                    await FileUtils.loadPageScript('/js/' + script)
                }
            }

            // проверяем есть ли поле title и меняем его на странице
            if (newRoute.title) {
                this.titlePageElement.innerText = newRoute.title;
            }


            if (newRoute.filePathTemplate) {
                if (newRoute.useLayout) {
                    this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text());
                    const contentLayoutPageElement = document.getElementById('content-layout');
                    contentLayoutPageElement.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());
                } else {
                    // this.contentPageElement = document.getElementById('content');
                    this.contentPageElement.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());
                }


                // let contentBlock = this.contentPageElement;
                // if (newRoute.useLayout) {
                //     this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text());
                //     contentBlock = document.getElementById('content-layout');
                // }
                // contentBlock.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());

            }


            if (newRoute.load && typeof newRoute.load === 'function') {
                newRoute.load();
            }

        } else {
            window.location = '/';
        }
    }
}