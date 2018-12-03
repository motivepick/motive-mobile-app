import { iOSColors } from 'react-native-typography'
import moment from 'moment'

const DEFAULT_DATE_COLOR = iOSColors.gray

export const getDateColor = (date, useDefaultColor) => {
    if (date && !useDefaultColor) {
        return moment() > moment(date, moment.ISO_8601).local().endOf('day') ? iOSColors.red : iOSColors.green
    } else {
        return DEFAULT_DATE_COLOR
    }
}

export const getDateAsStr = date => date ? moment(date, moment.ISO_8601).local().calendar() : null
