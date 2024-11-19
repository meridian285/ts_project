export class DateUtils{

    static today() {
        return {
            dateFrom: new Date().toISOString().slice(0, 10),
            dateTo: new Date().toISOString().slice(0, 10)
        }
    }
    static lastWeekInterval() {
        const lastMonday = new Date().getDate() + 1 - (new Date().getDay());

        return {
            dateFrom: (new Date(new Date().getFullYear(), new Date().getMonth(), lastMonday)).toISOString().slice(0, 10),
            dateTo: new Date().toISOString().slice(0, 10)
        }
    }

    static lastMothInterval() {
        return {
            dateFrom: (new Date(new Date().getFullYear(), new Date().getMonth(), 2)).toISOString().slice(0, 10),
            dateTo: new Date().toISOString().slice(0, 10)
        };
    }

    static lastYearInterval() {
        return {
            dateFrom: (new Date(new Date().getFullYear(), 0, 2)).toISOString().slice(0, 10),
            dateTo: new Date().toISOString().slice(0, 10)
        };
    }

    static allTimeInterval() {
        return {
            dateFrom: (new Date(1970, 0, 2)).toISOString().slice(0, 10),
            dateTo: new Date().toISOString().slice(0, 10)
        };
    }

    static selectInterval(firstDate, secondDate) {
        return {
            dateFrom: firstDate,
            dateTo: secondDate,
        };
    }
}