import { CHANGE_NEW_GOAL_NAME, CREATE_NEW_GOAL, SET_GOAL, UPDATE_USER_GOALS } from '../actions/goalsActions'

const INITIAL_STATE = { goal: {}, goals: [] }

export default function (state = INITIAL_STATE, action) {
    const { type, payload } = action
    if (type === CHANGE_NEW_GOAL_NAME) {
        return { ...state, newGoalName: payload }
    } else if (type === CREATE_NEW_GOAL) {
        const [allBtn, todayBtn, weekBtn, ...otherGoals] = state.goals
        const newGoalBtn = otherGoals.pop()
        const goals = otherGoals.slice(0, -1)
        return { ...state, goals: [allBtn, todayBtn, weekBtn, ...goals, payload, newGoalBtn] }
    } else if (type === UPDATE_USER_GOALS) {
        return { ...state, goals: payload }
    } else if (type === SET_GOAL) {
        return { ...state, goal: { id: payload.id, type: payload.type } }
    } else {
        return state
    }
}
