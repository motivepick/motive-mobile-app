import type { Task } from './schedule'

const absent = value => !value
const present = value => !absent(value)

export const orderTasksByDate = (tasks: Array<Task>): Array<Task> => {
    return tasks.sort((a, b) => {
        if (absent(a.dueDate) && absent(b.dueDate)) {
            return 0
        } else if (absent(a.dueDate) && present(b.dueDate)) {
            return 1
        } else if (present(a.dueDate) && absent(b.dueDate)) {
            return -1
        } else {
            return a.dueDate.isAfter(b.dueDate) ? 1 : -1
        }
    })
}
