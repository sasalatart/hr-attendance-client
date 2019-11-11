import { format, utcToZonedTime } from 'date-fns-tz';
import parseISO from 'date-fns/parseISO';
import { getCurrentDateLocale } from '../locales';

// eslint-disable-next-line import/prefer-default-export
export function formatStamp(date, timeZone, displayFormat = 'PPpp') {
  return format(utcToZonedTime(parseISO(date), timeZone), displayFormat, {
    locale: getCurrentDateLocale(),
    timeZone,
  });
}
