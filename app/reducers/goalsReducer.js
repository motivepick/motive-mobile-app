import {
    CHANGE_GOAL_COLOR,
    CHANGE_GOAL_DESCRIPTION,
    CHANGE_GOAL_DUE_DATE,
    CHANGE_GOAL_NAME,
    CREATE_NEW_GOAL,
    SET_GOAL,
    UPDATE_USER_GOALS
} from '../actions/goalsActions'

const INITIAL_STATE = { goal: {}, goals: [] }

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action
    if (type === SET_GOAL) {
        return { ...state, goal: payload }
    } else if (type === CHANGE_GOAL_NAME) {
        return { ...state, goalName: payload }
    } else if (type === CHANGE_GOAL_DESCRIPTION) {
        return { ...state, goalDescription: payload }
    } else if (type === CHANGE_GOAL_COLOR) {
        return { ...state, goalColor: payload }
    } else if (type === CHANGE_GOAL_DUE_DATE) {
        return { ...state, goalDueDate: payload }
    } else if (type === CREATE_NEW_GOAL) {
        return { ...state, goals: [payload, ...state.goals] }
    } else if (type === UPDATE_USER_GOALS) {
        return { ...state, goals: payload }
    } else {
        return state
    }
}
