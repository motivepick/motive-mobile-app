import moment from 'moment'

export const orderTasksByDate = (tasks) => {
    const dueDateOf = task => moment(task.dueDate, moment.ISO_8601)
    const absent = value => !value
    const present = value => !absent(value)

    return tasks.sort((a, b) => {
        if (absent(a.dueDate) && absent(b.dueDate)) {
            return 0
        } else if (absent(a.dueDate) && present(b.dueDate)) {
            return 1
        } else if (present(a.dueDate) && absent(b.dueDate)) {
            return -1
        } else {
            return dueDateOf(a).isAfter(dueDateOf(b)) ? 1 : -1
        }
    })
}
