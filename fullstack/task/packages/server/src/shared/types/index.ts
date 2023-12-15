export enum BankAlpha2Code {
    CZ = 'CZ',
}

export enum Languages {
    EN = 'EN',
    CZ = 'CZ',
}

export interface ExchangeRate {
    amount: number;
    currency: string;
    country: string;
    currencyCode: string;
    rate: number;
    createdAtUtc: Date;
}

export interface WithPagination<T> {
    itemsCount: number;
    entities: T[];
}
