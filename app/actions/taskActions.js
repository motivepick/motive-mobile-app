export const SET_TASK = 'SET_TASK'
export const CHANGE_TASK_NAME = 'CHANGE_TASK_NAME'
export const CHANGE_TASK_DESCRIPTION = 'CHANGE_TASK_DESCRIPTION'

export const setTaskAction = task => ({ type: SET_TASK, payload: task })

export const changeTaskNameAction = name => ({ type: CHANGE_TASK_NAME, payload: name })

export const changeTaskDescriptionAction = description => ({ type: CHANGE_TASK_DESCRIPTION, payload: description })
