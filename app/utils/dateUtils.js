import { iOSColors } from 'react-native-typography'
import moment from 'moment'

const DEFAULT_DATE_COLOR = iOSColors.gray

export const getDateColor = (date, useDefaultColor) => {
    if (date && !useDefaultColor) {
        return moment() > moment(date, moment.ISO_8601).local() ? iOSColors.red : iOSColors.green
    } else {
        return DEFAULT_DATE_COLOR
    }
}

export const getDateAsStr = (date) => {
    return date ? moment(date, moment.ISO_8601).local().calendar() : null
}

export const getRelevantTasks = (tasks) => {
    const weeklyTasks = new Map()
    weeklyTasks.set('Next', tasks)

    return {
        weeklyTasks,
    }
}
