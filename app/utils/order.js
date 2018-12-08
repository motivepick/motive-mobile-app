import type { Task } from './schedule'

const absent = value => !value
const present = value => !absent(value)

const orderTasksByDate = (tasks: Array<Task>, field: string): Array<Task> => {
    return tasks.sort((a, b) => {
        if (absent(a[field]) && absent(b[field])) {
            return 0
        } else if (absent(a[field]) && present(b[field])) {
            return 1
        } else if (present(a[field]) && absent(b[field])) {
            return -1
        } else {
            return a[field].isAfter(b[field]) ? -1 : 1
        }
    })
}

export const orderTasksByCreated = (tasks: Array<Task>): Array<Task> => orderTasksByDate(tasks, 'created')

export const orderTasksByClosingDate = (tasks: Array<Task>): Array<Task> => orderTasksByDate(tasks, 'closingDate')
