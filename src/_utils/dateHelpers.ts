import { getLocales } from 'react-native-localize';
import { format, isAfter, isBefore, isValid, Locale, parse } from 'date-fns';
import { enUS, fr, nl } from 'date-fns/locale';

export const DEFAULT_DATE_STRING_FORMAT = 'dd/MM/yyyy';
export const DEFAULT_DATETIME_STRING_FORMAT = 'dd/MM/yyyy HH:mm';
export const DEFAULT_TIME_STRING_FORMAT = 'HH:mm';

function getCorrectLocale(): Locale {
  const locale = getLocales()[0].languageCode;
  switch (locale) {
    case 'nl':
      return nl;
    case 'fr':
      return fr;

    default:
      return enUS;
  }
}

export function formatDate(date: Date, formatString = DEFAULT_DATE_STRING_FORMAT): string {
  if (!isValid(date)) return null;
  return format(date, formatString, { locale: getCorrectLocale() });
}

export function formatTime(time: string | Date): string {
  if (!time) return null;
  return formatDate(new Date(time), DEFAULT_TIME_STRING_FORMAT);
}

export function formatISOString(isoString?: string, formatString = DEFAULT_DATE_STRING_FORMAT): string {
  if (!isoString) return null;
  return formatDate(new Date(isoString), formatString);
}

export function dateFromString(dateString: string, formatString = DEFAULT_DATE_STRING_FORMAT): Date {
  if (!dateString) return null;
  const date = parse(dateString, formatString, new Date(), { locale: getCorrectLocale() });
  if (!isValid(date)) return null;
  return date;
}

export function dateFromTime(timeString: string): Date {
  return dateFromString(timeString, DEFAULT_TIME_STRING_FORMAT);
}

export function dateFromDateAndTime(date: string, time: string): Date {
  if (!date || !time) return null;
  return dateFromString(`${date} ${time}`, `${DEFAULT_DATE_STRING_FORMAT} ${DEFAULT_TIME_STRING_FORMAT}`);
}

export function ISOStringFromDate(date?: Date): string {
  if (!isValid(date)) return null;
  return date.toISOString();
}

export function isAfterDate(date: Date, minDate: Date): boolean {
  return isAfter(date, minDate);
}

export function isBeforeDate(date: Date, maxDate: Date): boolean {
  return isBefore(date, maxDate);
}
