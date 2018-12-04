import moment, { Moment } from 'moment'

const ISO_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS'

export const getFormatFromCurrentLocale = () => moment.localeData().longDateFormat('L')

export const formatDateInCurrentLocale = (date: Moment) => date ? date.format(getFormatFromCurrentLocale()) : ''

export const parseDateInCurrentLocale = (dateAsStringInLocalFormat: string): Moment => moment(dateAsStringInLocalFormat, getFormatFromCurrentLocale())

export const formatDateInIso = (date: Moment): string => date.format(ISO_FORMAT)

export const parseDateInIso = (isoDate: string): Moment => moment(isoDate, ISO_FORMAT)
