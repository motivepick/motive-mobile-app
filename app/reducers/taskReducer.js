import { CHANGE_TASK_DESCRIPTION, CHANGE_TASK_DUE_DATE, CHANGE_TASK_NAME, SET_TASK } from '../actions/taskActions'

const INITIAL_STATE = {
    task: {},
}

export default (state = INITIAL_STATE, action) => {
    const { type } = action
    if (type === SET_TASK) {
        return { ...state, task: action.payload }
    } else if (type === CHANGE_TASK_NAME) {
        const task = { ...state.task, name: action.payload }
        return { ...state, task }
    } else if (type === CHANGE_TASK_DESCRIPTION) {
        const task = { ...state.task, description: action.payload }
        return { ...state, task }
    } else if (type === CHANGE_TASK_DUE_DATE) {
        const task = { ...state.task, dueDate: action.payload }
        console.log('GOING TO CHANGE STATE TO', action.payload)
        return { ...state, task }
    } else {
        return state
    }
}
