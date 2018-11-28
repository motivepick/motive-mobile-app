import {
    CHANGE_TASK_DESCRIPTION,
    CHANGE_TASK_NAME,
    CLOSE_TASK,
    CREATE_TASK,
    DELETE_TASK,
    SET_FILTER,
    SET_TASK,
    UNDO_CLOSE_TASK,
    UPDATE_CLOSED_USER_TASKS,
    UPDATE_TASK,
    UPDATE_USER_TASKS
} from '../actions/tasksActions'

const INITIAL_STATE = {
    task: {},
    tasks: [],
    totalClosedTasksShown: 10,
    listFilter: 'all'
}

export default function (state = INITIAL_STATE, action) {
    const { type } = action
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
    } else if (type === UPDATE_CLOSED_USER_TASKS) {
        return { ...state, closedTasks: action.payload }
    } else if (type === CLOSE_TASK) {
        return { ...state, tasks: state.tasks.map(t => t.id === action.payload ? { ...t, closed: true } : t) }
    } else if (type === UNDO_CLOSE_TASK) {
        return { ...state, tasks: state.tasks.map(t => t.id === action.payload ? { ...t, closed: false } : t) }
    } else if (type === UPDATE_TASK) {
        const { payload } = action
        const tasks = []
        for (const task of state.tasks) {
            tasks.push(task.id === payload.id ? { ...task, ...payload } : task)
        }
        return { ...state, tasks }
    } else if (type === DELETE_TASK) {
        return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) }
    } else {
        return state
    }
}
