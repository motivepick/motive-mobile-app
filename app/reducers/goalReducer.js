import { CHANGE_NEW_GOAL_NAME, CREATE_NEW_GOAL, SET_GOAL, UPDATE_USER_GOALS } from '../actions/goalActions'

const INITIAL_STATE = { goal: {}, goals: [] }

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action
    if (type === CHANGE_NEW_GOAL_NAME) {
        return { ...state, newGoalName: payload }
    } else if (type === CREATE_NEW_GOAL) {
        return { ...state, goals: [payload].concat(state.goals) }
    } else if (type === UPDATE_USER_GOALS) {
        return { ...state, goals: payload }
    } else if (type === SET_GOAL) {
        return { ...state, goal: { id: payload.id, type: payload.type } }
    } else {
        return state
    }
}
