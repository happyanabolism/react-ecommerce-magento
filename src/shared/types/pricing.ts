export enum CurrencyEnum {
  EUR = 'EUR',
  USD = 'USD',
}

export interface Money {
  currency?: CurrencyEnum;
  value?: number;
}
