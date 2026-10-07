import { LOCALE } from '@shared/config';

export const formatPrice = (value: number, currency: string) => {
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency,
  }).format(value);
};
