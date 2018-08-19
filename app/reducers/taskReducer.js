import update from 'immutability-helper'

import { CLOSE_TASK, CREATE_TASK, SEARCH_USER_TASKS, SHOW_ERROR, UPDATE_NEW_TASK_NAME, UPDATE_TASK, UPDATE_USER_TASKS } from '../actions/taskActions'

const INITIAL_STATE = {
    tasks: [],
    newTaskName: '',
    error: null
}
export default function (state = INITIAL_STATE, action) {
    const { type } = action
    if (type === SEARCH_USER_TASKS || type === CREATE_TASK || type === UPDATE_TASK) {
        return { ...state }
    } else if (type === UPDATE_NEW_TASK_NAME) {
        return { ...state, newTaskName: action.payload }
    } else if (type === UPDATE_USER_TASKS) {
        return { ...state, tasks: update(state.tasks, action.query) }
    } else if (type === SHOW_ERROR) {
        return { ...state, error: action.error }
    } else if (type === CLOSE_TASK) {
        return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) }
    } else {
        return state
    }
}
