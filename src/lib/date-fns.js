import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { getCurrentDateLocale } from '../locales';

// eslint-disable-next-line import/prefer-default-export
export function formatStamp(date) {
  return format(parseISO(date), 'PPpp', {
    locale: getCurrentDateLocale(),
  });
}
