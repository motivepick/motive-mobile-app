import { CHANGE_NEW_GOAL_NAME, CREATE_NEW_GOAL, SEARCH_USER_GOALS, UPDATE_USER_GOALS } from '../actions/goalActions'
import update from 'immutability-helper'

const INITIAL_STATE = { goals: [] }

export default function (state = INITIAL_STATE, action) {
    const { type } = action
    if (type === SEARCH_USER_GOALS) {
        return { ...state }
    } else if (type === CHANGE_NEW_GOAL_NAME) {
        return { ...state, newGoalName: action.payload }
    } else if (type === CREATE_NEW_GOAL) {
        return { ...state, goals: [action.payload].concat(state.goals) }
    } else if (type === UPDATE_USER_GOALS) {
        return { ...state, goals: update(state.goals, action.query) }
    } else {
        return state
    }
}
