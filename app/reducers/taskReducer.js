import { CHANGE_TASK_DESCRIPTION, CHANGE_TASK_NAME, SAVE_TASK, SET_TASK } from '../actions/taskActions'

const INITIAL_STATE = {
    task: {},
}

export default (state = INITIAL_STATE, action) => {
    const { type } = action
    if (type === SET_TASK) {
        return { ...state, task: action.payload }
    } else if (type === CHANGE_TASK_NAME) {
        const task = { ...state.task, name: action.payload }
        return { ...state, task: task }
    } else if (type === CHANGE_TASK_DESCRIPTION) {
        const task = { ...state.task, description: action.payload }
        return { ...state, task: task }
    } else if (type === SAVE_TASK) {
        const { name, description } = action.payload
        const task = { ...state.task, name, description }
        return { ...state, task: task }
    } else {
        return state
    }
}
