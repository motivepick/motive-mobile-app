import {
    CHANGE_TASK_DESCRIPTION,
    CHANGE_TASK_NAME,
    CLOSE_TASK,
    CREATE_TASK,
    DELETE_TASK,
    HIDE_CLOSED_TASKS,
    SET_FILTER,
    SET_TASK,
    SHOW_CLOSED_TASKS,
    UNDO_CLOSE_TASK,
    UPDATE_CLOSED_USER_TASKS,
    UPDATE_TASK,
    UPDATE_USER_SCHEDULE,
    UPDATE_USER_TASKS
} from '../actions/tasksActions'

const INITIAL_STATE = {
    task: {},
    tasks: [],
    schedule: { week: {}, overdue: [], future: [] },
    listFilter: 'all',
    closedTasks: [],
    closedTasksAreShown: false
}

const updatedTasks = (state, id) => {
    const task = state.closedTasks.find(t => t.id === id)
    return [{ ...task, closed: false }, ...state.tasks]
}

const updatedClosedTasks = (state, id) => {
    if (state.closedTasksAreShown) {
        const task = state.tasks.find(t => t.id === id)
        return [{ ...task, closed: true }, ...state.closedTasks]
    } else {
        return state.closedTasks
    }
}

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action
    if (type === SET_TASK) {
        return { ...state, task: action.payload }
    } else if (type === CHANGE_TASK_NAME) {
        const task = { ...state.task, name: action.payload }
        return { ...state, task }
    } else if (type === CHANGE_TASK_DESCRIPTION) {
        const task = { ...state.task, description: action.payload }
        return { ...state, task }
    } else if (type === CREATE_TASK) {
        return { ...state, tasks: [action.payload, ...state.tasks] }
    } else if (type === SET_FILTER) {
        return { ...state, listFilter: action.payload }
    } else if (type === UPDATE_USER_TASKS) {
        return { ...state, tasks: action.payload }
    } else if (type === UPDATE_USER_SCHEDULE) {
        return { ...state, schedule: payload }
    } else if (type === UPDATE_CLOSED_USER_TASKS) {
        return { ...state, closedTasks: action.payload }
    } else if (type === SHOW_CLOSED_TASKS) {
        return { ...state, closedTasksAreShown: true }
    } else if (type === HIDE_CLOSED_TASKS) {
        return { ...state, closedTasksAreShown: false }
    } else if (type === CLOSE_TASK) {
        return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload), closedTasks: updatedClosedTasks(state, action.payload) }
    } else if (type === UNDO_CLOSE_TASK) {
        return { ...state, tasks: updatedTasks(state, action.payload), closedTasks: state.closedTasks.filter(t => t.id !== action.payload) }
    } else if (type === UPDATE_TASK) {
        const { payload } = action
        const tasks = []
        for (const task of state.tasks) {
            tasks.push(task.id === payload.id ? { ...task, ...payload } : task)
        }
        return { ...state, tasks }
    } else if (type === DELETE_TASK) {
        return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload), closedTasks: state.closedTasks.filter(t => t.id !== action.payload) }
    } else {
        return state
    }
}
