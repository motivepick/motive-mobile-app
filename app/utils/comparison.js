// @flow
import type { Task } from './schedule'

export const tasksChanged = (tasks: Array<Task>, nextTasks: Array<Task>) => {
    if (tasks.length === nextTasks.length) {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i] !== nextTasks[i]) {
                return true
            }
        }
        return false
    } else {
        return true
    }
}
