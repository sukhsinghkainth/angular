export enum categoryType {
    expense = 'expense',
    income = 'income',
}

export enum AccountType {
    SAVINGS = 'savings',
    CARD = 'card',
    CASH = 'cash'
} 

export interface Icategory{
     name : string,
     type : categoryType
}
 
export interface Budget {
    category : Icategory
    limit: number;
    spent: number;
    remaininglimit: number;
}

export interface Transaction {
    amount: number;
    type: categoryType;
    notes: string;
    category:  Icategory
    date: Date;
    account: string;
}

export interface Account {
    accountType: AccountType;
    transactions: Transaction[];
    balance? : number
}

export interface ITransaction {
    _id : string,
    type : categoryType,
    account : {
        _id : string,
        accountType : AccountType
    },
   category : Icategory,
   notes : string,
   date : Date,
   amount : number
}

