export const SET_TASK = 'SET_TASK'
export const CHANGE_TASK_NAME = 'CHANGE_TASK_NAME'

export const setTaskAction = task => ({ type: SET_TASK, payload: task })

export const changeTaskNameAction = name => ({ type: CHANGE_TASK_NAME, payload: name })
