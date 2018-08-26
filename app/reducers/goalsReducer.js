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
    if (type === CHANGE_GOAL_NAME) {
        return { ...state, goalName: payload }
    } else if (type === CHANGE_GOAL_DESCRIPTION) {
        return { ...state, goalDescription: payload }
    } else if (type === CHANGE_GOAL_COLOR) {
        return { ...state, goalColor: payload }
    } else if (type === CHANGE_GOAL_DUE_DATE) {
        return { ...state, goalDueDate: payload }
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
