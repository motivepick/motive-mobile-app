export const SET_GOAL = 'SET_GOAL'
export const CHANGE_GOAL_NAME = 'CHANGE_GOAL_NAME'
export const CHANGE_GOAL_DESCRIPTION = 'CHANGE_GOAL_DESCRIPTION'
export const CHANGE_GOAL_COLOR = 'CHANGE_GOAL_COLOR'
export const CREATE_NEW_GOAL = 'CREATE_NEW_GOAL'
export const UPDATE_USER_GOALS = 'UPDATE_USER_GOALS'
export const UPDATE_GOAL_TASKS = 'UPDATE_GOAL_TASKS'
export const CREATE_GOAL_TASK = 'CREATE_GOAL_TASK'
export const CLOSE_GOAL_TASK = 'CLOSE_GOAL_TASK'
export const DELETE_GOAL_TASK = 'DELETE_GOAL_TASK'
export const UPDATE_GOAL = 'UPDATE_GOAL'
export const DELETE_GOAL = 'DELETE_GOAL'

export const setGoalAction = goal => ({ type: SET_GOAL, payload: goal })

export const changeGoalNameAction = name => ({ type: CHANGE_GOAL_NAME, payload: name })

export const changeGoalDescriptionAction = description => ({ type: CHANGE_GOAL_DESCRIPTION, payload: description })

export const changeGoalColorAction = colorTag => ({ type: CHANGE_GOAL_COLOR, payload: colorTag })

export const createNewGoalAction = goal => ({ type: CREATE_NEW_GOAL, payload: goal })

export const updateUserGoalsAction = goals => ({ type: UPDATE_USER_GOALS, payload: goals })

export const updateGoalTasksAction = (listFilter, tasks) => ({ type: UPDATE_GOAL_TASKS, payload: { listFilter, tasks } })

export const createGoalTaskAction = task => ({ type: CREATE_GOAL_TASK, payload: task })

export const closeGoalTaskAction = id => ({ type: CLOSE_GOAL_TASK, payload: id })

export const deleteGoalTaskAction = id => ({ type: DELETE_GOAL_TASK, payload: id })

export const updateGoalAction = goal => ({ type: UPDATE_GOAL, payload: goal })

export const deleteGoalAction = id => ({ type: DELETE_GOAL, payload: id })
