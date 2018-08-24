export const SET_TASK = 'SET_TASK'
export const CHANGE_TASK_NAME = 'CHANGE_TASK_NAME'
export const CHANGE_TASK_DESCRIPTION = 'CHANGE_TASK_DESCRIPTION'
export const SAVE_TASK = 'SAVE_TASK'

export const setTaskAction = task => ({ type: SET_TASK, payload: task })

export const changeTaskNameAction = taskName => ({ type: CHANGE_TASK_NAME, payload: taskName })

export const changeTaskDescriptionAction = taskDescription => ({ type: CHANGE_TASK_DESCRIPTION, payload: taskDescription })

export const saveTaskAction = task => ({ type: SAVE_TASK, payload: task })
