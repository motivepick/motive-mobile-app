export const CHANGE_NEW_GOAL_NAME = 'CHANGE_NEW_GOAL_NAME'
export const CREATE_NEW_GOAL = 'CREATE_NEW_GOAL'
export const UPDATE_USER_GOALS = 'UPDATE_USER_GOALS'
export const SET_GOAL = 'SET_GOAL'

export const changeNewGoalNameAction = newGoalName => ({ type: CHANGE_NEW_GOAL_NAME, payload: newGoalName })

export const createNewGoalAction = goal => ({ type: CREATE_NEW_GOAL, payload: goal })

export const setGoal = (id, type) => ({ type: SET_GOAL, payload: { id, type } })

export const updateUserGoals = goals => ({ type: UPDATE_USER_GOALS, payload: goals })
