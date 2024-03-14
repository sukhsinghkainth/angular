export enum categoryType {
    expense = 'expense',
    income = 'income',
}

export enum AccountType {
    SAVINGS = 'savings',
    CARD = 'card',
    CASH = 'cash'
}

export interface Budget {
    category: categoryType;
    limit: number;
    spent: number;
    remaininglimit: number;
}


