const host = 'http://localhost:3000';

export default {
    host: host,
    api: host + '/api',
};

export const HEADERS = {
    'Content-type': 'application/json',
    'Accept': 'application/json',
};

export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';

// auth
export const LOGIN = '/login';
export const SIGNUP = '/signup';
export const LOGOUT = '/logout';
export const REFRESH = '/refresh';


export const DASHBOARD = '/dashboard';
export const INCOME = '/income';
export const CREATE_INCOME = '/income/create';
export const INCOME_EDIT = '/income/edit';
export const DELETE_INCOME = '/income/delete';

export const EXPENSES = '/expenses';
export const CREATE_EXPENSES = '/expenses/create';
export const EDIT_EXPENSES = '/expenses/edit';
export const DELETE_EXPENSE = '/expense/delete';

export const INCOME_AND_EXPENSES = '/income-and-expenses';
export const CREATE_INCOME_AND_EXPENSES = '/create-income-and-expenses';
export const EDIT_INCOME_AND_EXPENSES = '/edit-income-and-expenses';
export const BALANCE = '/balance';

// categories
export  const GET_CATEGORIES_EXPENSE = '/categories/expense';
export  const GET_CATEGORIES_INCOME = '/categories/income';

// operations
export const OPERATIONS = '/operations';

export function handler(element) {
    const id = element.id.replace(/[^0-9]/g,"")
    document.getElementById('delete-btn').href = DELETE_INCOME + '?id=' + id;
}