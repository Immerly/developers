import { BankAlpha2Code, Languages } from '../types';
import { Bank } from './Bank.model';

export class CzechNationalBank extends Bank {
    public alpha2Code = BankAlpha2Code.CZ;

    public getDataSourceUrl(lang: Languages, date: Date): string {
        return `https://api.cnb.cz/cnbapi/exrates/daily?date=${this.parseDate(date)}&lang=${lang}`;
    }

    protected parseDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
}
