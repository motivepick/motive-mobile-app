export const SET_GOAL = 'SET_GOAL'
export const CHANGE_GOAL_NAME = 'CHANGE_GOAL_NAME'
export const CHANGE_GOAL_DESCRIPTION = 'CHANGE_GOAL_DESCRIPTION'
export const CHANGE_GOAL_COLOR = 'CHANGE_GOAL_COLOR'
export const CREATE_NEW_GOAL = 'CREATE_NEW_GOAL'
export const UPDATE_USER_GOALS = 'UPDATE_USER_GOALS'
export const UPDATE_GOAL = 'UPDATE_GOAL'
export const DELETE_GOAL = 'DELETE_GOAL'

export const setGoalAction = goal => ({ type: SET_GOAL, payload: goal })

export const changeGoalNameAction = name => ({ type: CHANGE_GOAL_NAME, payload: name })

export const changeGoalDescriptionAction = goalDescription => ({ type: CHANGE_GOAL_DESCRIPTION, payload: goalDescription })

export const changeGoalColorAction = goalColor => ({ type: CHANGE_GOAL_COLOR, payload: goalColor })

export const createNewGoalAction = goal => ({ type: CREATE_NEW_GOAL, payload: goal })

export const setGoal = (id, type) => ({ type: SET_GOAL, payload: { id, type } })

export const updateUserGoalsAction = goals => ({ type: UPDATE_USER_GOALS, payload: goals })

export const updateGoalAction = goal => ({ type: UPDATE_GOAL, payload: goal })

export const deleteGoalAction = id => ({ type: DELETE_GOAL, payload: id })
