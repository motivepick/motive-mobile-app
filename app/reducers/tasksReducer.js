import {
    CHANGE_NEW_TASK_NAME,
    CLOSE_TASK,
    CREATE_TASK,
    END_CREATING_TASK,
    SHOW_ERROR,
    START_CREATING_TASK,
    UPDATE_TASK,
    UPDATE_USER_TASKS
} from '../actions/tasksActions'

const INITIAL_STATE = {
    tasks: [],
    newTaskName: '',
    newTaskNameInputDisabled: false,
    error: null
}
export default function (state = INITIAL_STATE, action) {
    const { type } = action
    if (type === CHANGE_NEW_TASK_NAME) {
        return { ...state, newTaskName: action.payload }
    } else if (type === CREATE_TASK) {
        return { ...state, tasks: [action.payload].concat(state.tasks) }
    } else if (type === START_CREATING_TASK) {
        return { ...state, creatingTask: true }
    } else if (type === END_CREATING_TASK) {
        return { ...state, creatingTask: false }
    } else if (type === UPDATE_USER_TASKS) {
        return { ...state, tasks: action.payload }
    } else if (type === SHOW_ERROR) {
        return { ...state, error: action.error }
    } else if (type === CLOSE_TASK) {
        return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) }
    } else if (type === UPDATE_TASK) {
        const { id, name, description } = action.payload
        const tasks = []
        for (const task of state.tasks) {
            tasks.push(task.id === id ? { ...task, name, description } : task)
        }
        return { ...state, tasks }
    } else {
        return state
    }
}
