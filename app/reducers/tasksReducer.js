import {
    CHANGE_TASK_DESCRIPTION,
    CLOSE_TASK,
    CREATE_TASK,
    DELETE_TASK,
    RESET_CLOSED_TASKS,
    SET_TASK,
    SHOW_MORE_TASKS,
    UNDO_CLOSE_TASK,
    UPDATE_TASK,
    UPDATE_USER_TASKS
} from '../actions/tasksActions'

const INITIAL_STATE = {
    task: {},
    tasks: [],
    totalClosedTasksShown: 10
}

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action
    if (type === SET_TASK) {
        return { ...state, task: payload }
    } else if (type === CHANGE_TASK_DESCRIPTION) {
        const task = { ...state.task, description: payload }
        return { ...state, task }
    } else if (type === CREATE_TASK) {
        return { ...state, tasks: [payload, ...state.tasks] }
    } else if (type === UPDATE_USER_TASKS) {
        return { ...state, tasks: payload }
    } else if (type === CLOSE_TASK) {
        const { id, closingDate } = payload
        return { ...state, tasks: state.tasks.map(t => t.id === id ? { ...t, closed: true, closingDate } : t) }
    } else if (type === UNDO_CLOSE_TASK) {
        const { id, created } = payload
        return { ...state, tasks: state.tasks.map(t => t.id === id ? { ...t, closed: false, created } : t) }
    } else if (type === UPDATE_TASK) {
        const tasks = []
        for (const task of state.tasks) {
            tasks.push(task.id === payload.id ? { ...task, ...payload } : task)
        }
        return { ...state, tasks, task: { ...state.task, ...payload } }
    } else if (type === DELETE_TASK) {
        return { ...state, tasks: state.tasks.filter(t => t.id !== payload) }
    } else if (type === SHOW_MORE_TASKS) {
        return { ...state, totalClosedTasksShown: state.totalClosedTasksShown + 10 }
    } else if (type === RESET_CLOSED_TASKS) {
        return { ...state, totalClosedTasksShown: 10 }
    } else {
        return state
    }
}
