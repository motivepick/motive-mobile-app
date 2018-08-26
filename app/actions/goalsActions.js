export const CHANGE_GOAL_NAME = 'CHANGE_GOAL_NAME'
export const CHANGE_GOAL_DESCRIPTION = 'CHANGE_GOAL_DESCRIPTION'
export const CHANGE_GOAL_COLOR = 'CHANGE_GOAL_COLOR'
export const CHANGE_GOAL_DUE_DATE = 'CHANGE_GOAL_DUE_DATE'
export const CREATE_NEW_GOAL = 'CREATE_NEW_GOAL'
export const UPDATE_USER_GOALS = 'UPDATE_USER_GOALS'
export const SET_GOAL = 'SET_GOAL'

export const changeGoalNameAction = goalName => ({ type: CHANGE_GOAL_NAME, payload: goalName })

export const changeGoalDescriptionAction = goalDescription => ({ type: CHANGE_GOAL_DESCRIPTION, payload: goalDescription })

export const changeGoalColorAction = goalColor => ({ type: CHANGE_GOAL_COLOR, payload: goalColor })

export const changeGoalDueDateAction = goalDueDate => ({ type: CHANGE_GOAL_DUE_DATE, payload: goalDueDate })

export const createNewGoalAction = goal => ({ type: CREATE_NEW_GOAL, payload: goal })

export const setGoal = (id, type) => ({ type: SET_GOAL, payload: { id, type } })

export const updateUserGoals = goals => ({ type: UPDATE_USER_GOALS, payload: goals })
