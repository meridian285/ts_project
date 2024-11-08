export default {
    host: 'http://localhost:3000/api'
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
export const CREATE_INCOME = '/create-income';
export const EDIT_INCOME = '/edit-income';
export const DELETE_INCOME = '/delete-income';

export const EXPENSES = '/expenses';
export const CREATE_EXPENSES = '/create-expenses';
export const EDIT_EXPENSES = '/edit-expenses';
export const DELETE_EXPENSES = '/delete-expenses';

export const INCOME_AND_EXPENSES = '/income-and-expenses';
export const BALANCE = '/balance';

// categories
export  const GET_CATEGORIES_EXPENSE = '/categories/expense';
export  const GET_CATEGORIES_INCOME = '/categories/income';

// operations
export const OPERATIONS = '/operations';