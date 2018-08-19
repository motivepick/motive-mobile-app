import { SEARCH_USER_GOALS, SET_GOAL, UPDATE_USER_GOALS } from '../actions/goalActions'
import update from 'immutability-helper'

const INITIAL_STATE = { goals: [] }

export default function (state = INITIAL_STATE, action) {
    const { type } = action
    if (type === SEARCH_USER_GOALS) {
        return { ...state }
    } else if (type === UPDATE_USER_GOALS) {
        return { ...state, goals: update(state.goals, action.query) }
    } else if (type === SET_GOAL) {
        return { ...state, tasks: [] }
    } else {
        return state
    }
}
