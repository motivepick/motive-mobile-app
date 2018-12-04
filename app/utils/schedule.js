// @flow
import moment, { Moment } from 'moment'
import { formatDateInIso } from './dateFormat'

export type Task = {|
    id: number,
    closed: boolean,
    dueDate: Moment
|}

export type ScheduleItem = {|
    date: string,
    tasks: Array<Task>
|}

export type Schedule = {|
    week: Array<ScheduleItem>,
    future: Array<Task>,
    overdue: Array<Task>
|}

const overdue = (tasksWithDueDate: Array<Task>) => {
    const eod = moment.utc().startOf('day')
    return tasksWithDueDate.filter(t => t.dueDate.isBefore(eod))
}

const future = (tasksWithDueDate: Array<Task>): Array<Task> => {
    const startOfFuture = moment.utc().startOf('day').add(7, 'days')
    const firstFutureTask = tasksWithDueDate
        .filter(t => t.dueDate.isAfter(startOfFuture))
        .sort((a, b) => a.dueDate.diff(b.dueDate))[0]
    if (firstFutureTask) {
        const firstFutureTaskDate = firstFutureTask.dueDate
        return tasksWithDueDate.filter(t => firstFutureTaskDate.isSame(t.dueDate, 'day'))
    } else {
        return []
    }
}

export const schedule = (tasks: Array<Task>): Schedule => {
    const openTasksWithDueDate = tasks.filter(t => !t.closed && t.dueDate)
    const eod = moment.utc().endOf('day')
    const week = []
    for (let i = 0; i <= 6; i++) {
        const tasks: Array<Task> = openTasksWithDueDate.filter(t => eod.isSame(t.dueDate, 'day'))
        if (tasks.length > 0) {
            week.push({ date: formatDateInIso(eod), tasks })
        }
        eod.add(1, 'days')
    }
    return { week, future: future(openTasksWithDueDate), overdue: overdue(openTasksWithDueDate) }
}
