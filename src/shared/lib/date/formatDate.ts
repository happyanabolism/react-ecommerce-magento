import { LOCALE } from '@shared/config';

// Magento sends dates as 'YYYY-MM-DD HH:mm:ss' in UTC
export const formatDate = (value: string) => {
  return new Intl.DateTimeFormat(LOCALE, { dateStyle: 'medium' }).format(
    new Date(`${value.replace(' ', 'T')}Z`)
  );
};
