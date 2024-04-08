export enum categoryType {
    expense = 'expense',
    income = 'income',
}

export enum AccountType {
    SAVINGS = 'savings',
    CARD = 'card',
    CASH = 'cash'
}

export interface Icategory {
    name: string,
    type: categoryType,
    message?: string
}

export interface msg {
    message: string
}

export interface Budget {
    category: Icategory
    limit: number;
    spent: number;
    remaininglimit: number;
    budget?: [];
    message?: string
}

export interface Transaction {
    amount: number;
    type: categoryType;
    notes: string;
    category: Icategory
    date: Date;
    account: string;
    message: string
}

export interface Account {
    accountType: AccountType;
    transactions: Transaction[];
    balance?: number
}

export interface ITransaction {
    _id: string,
    type: categoryType,
    account: {
        _id: string,
        accountType: AccountType
    },
    category: Icategory,
    notes: string,
    date: Date,
    amount: number
}

