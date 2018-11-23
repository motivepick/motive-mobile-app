// @flow

import moment, { Moment } from 'moment'

const ISO_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSS'

export const getFormatFromCurrentLocale = () => moment.localeData().longDateFormat('L')

export const formatDateInCurrentLocale = (date: Moment) => date.format(getFormatFromCurrentLocale())

export const parseDateInCurrentLocale = (dateAsStringInLocalFormat: string) => moment(dateAsStringInLocalFormat, getFormatFromCurrentLocale())

export const formatDateInIso = (date: Moment) => date.format(ISO_FORMAT)

export const convertIsoDateToDateInCurrentLocale = (isoDate: string) => isoDate ? moment(isoDate, ISO_FORMAT).format(getFormatFromCurrentLocale()) : ''
