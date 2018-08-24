export const CHANGE_NEW_TASK_NAME = 'CHANGE_NEW_TASK_NAME'
export const UPDATE_USER_TASKS = 'UPDATE_USER_TASKS'
export const SHOW_ERROR = 'SHOW_ERROR'
export const CREATE_TASK = 'CREATE_TASK'
export const START_CREATING_TASK = 'START_CREATING_TASK'
export const END_CREATING_TASK = 'END_CREATING_TASK'
export const CLOSE_TASK = 'CLOSE_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'

export const changeNewTaskName = newTaskName => ({ type: CHANGE_NEW_TASK_NAME, payload: newTaskName })

export const updateUserTasks = tasks => ({ type: UPDATE_USER_TASKS, payload: tasks })

export const showError = error => ({ type: SHOW_ERROR, error })

export const createTask = task => ({ type: CREATE_TASK, payload: task })

export const startCreatingTask = () => ({ type: START_CREATING_TASK })

export const endCreatingTask = () => ({ type: END_CREATING_TASK })

export const closeTask = id => ({ type: CLOSE_TASK, payload: id })

export const updateTaskAction = task => ({ type: UPDATE_TASK, payload: task })
