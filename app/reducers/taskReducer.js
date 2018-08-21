import { CHANGE_NEW_TASK_NAME, CLOSE_TASK, CREATE_TASK, SHOW_ERROR, UPDATE_USER_TASKS } from '../actions/taskActions'

const INITIAL_STATE = {
    tasks: [],
    newTaskName: '',
    error: null
}
export default function (state = INITIAL_STATE, action) {
    const { type } = action
    if (type === CHANGE_NEW_TASK_NAME) {
        return { ...state, newTaskName: action.payload }
    } else if (type === CREATE_TASK) {
        return { ...state, tasks: [action.payload].concat(state.tasks) }
    } else if (type === UPDATE_USER_TASKS) {
        return { ...state, tasks: action.payload }
    } else if (type === SHOW_ERROR) {
        return { ...state, error: action.error }
    } else if (type === CLOSE_TASK) {
        return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) }
    } else {
        return state
    }
}
