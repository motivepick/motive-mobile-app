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

export const getRelevantTasks = (tasks, todayLabel) => {
    const tasksWithDates = tasks
        .filter(t => t.dueDate)
        .map(t => {
            t.dueDate = moment(t.dueDate, moment.ISO_8601).local()
            return t
        })
        .sort((a, b) => a.dueDate > b.dueDate)

    const weeklyTasks = new Map()
    const endOfWeek = moment().add(6, 'days').endOf('day')
    let nextDate = ''

    for (let i = 0; i < tasksWithDates.length; i++) {
        const t = tasksWithDates[i]
        nextDate = endOfWeek.isSameOrBefore(t.dueDate) && !nextDate ? t.dueDate.fromNow() : nextDate
        if (endOfWeek > t.dueDate || nextDate === t.dueDate.fromNow()) {
            let key = moment().startOf('day').isSameOrAfter(t.dueDate) ? todayLabel : t.dueDate.calendar()

            if (nextDate) {
                key = 'Next'
            }

            const previousValue = weeklyTasks.get(key)
            const value = previousValue && previousValue.length > 0 ? [...previousValue, t] : [t]
            weeklyTasks.set(key, value)
        } else {
            break
        }
    }

    return {
        weeklyTasks,
        nextDate
    }
}
