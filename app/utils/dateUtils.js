import { iOSColors } from 'react-native-typography'
import moment from 'moment'

const DEFAULT_DATE_COLOR = iOSColors.gray

export const getDateColor = (date, useDefaultColor) => {
    let dateColor = DEFAULT_DATE_COLOR
    if (date && !useDefaultColor) {
        dateColor = moment() > moment(date, moment.ISO_8601).local() ? iOSColors.red : iOSColors.green
    }
    return dateColor
}

export const getDateAsStr = (date) => {
    return date ? moment(date, moment.ISO_8601).local().calendar() : null
}

