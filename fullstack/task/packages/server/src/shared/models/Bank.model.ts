import { BankAlpha2Code } from '../types';

export abstract class Bank {
    public abstract alpha2Code: BankAlpha2Code;
    public abstract getDataSourceUrl(...params: any[]): string;
    protected abstract parseDate(data: Date): string;
}
