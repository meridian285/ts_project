export class Helpers {

    static intervalDate(date) {
        switch (date) {
            case 'week':
                return new Date(new Date().getDate() - 7).toISOString().slice(0, 10);
            case 'month':
                return new Date(new Date().getFullYear(), new Date().getMonth(), 2).toISOString().slice(0, 10);
            case 'year':
                return new Date(new Date().getFullYear(), 2, 2).toISOString().slice(0, 10);
            case 'all-time':
                return new Date(1970, 1, 1).toISOString().slice(0, 10);
            default:
                new Date(new Date().getDay()).toISOString().slice(0, 10);
        }
    }
}