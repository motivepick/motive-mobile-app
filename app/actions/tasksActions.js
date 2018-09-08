export const SET_FILTER = 'SET_FILTER'
export const UPDATE_USER_TASKS = 'UPDATE_USER_TASKS'
export const UPDATE_CLOSED_USER_TASKS = 'UPDATE_CLOSED_USER_TASKS'
export const SHOW_CLOSED_TASKS = 'SHOW_CLOSED_TASKS'
export const HIDE_CLOSED_TASKS = 'HIDE_CLOSED_TASKS'
export const CREATE_TASK = 'CREATE_TASK'
export const CLOSE_TASK = 'CLOSE_TASK'
export const UNDO_CLOSE_TASK = 'UNDO_CLOSE_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'
export const DELETE_TASK = 'DELETE_TASK'

export const setFilterAction = tasksFilter => ({ type: SET_FILTER, payload: tasksFilter })

export const updateUserTasksAction = tasks => ({ type: UPDATE_USER_TASKS, payload: tasks })

export const updateClosedUserTasksAction = tasks => ({ type: UPDATE_CLOSED_USER_TASKS, payload: tasks })

export const showClosedTasksAction = () => ({ type: SHOW_CLOSED_TASKS })

export const hideClosedTasksAction = () => ({ type: HIDE_CLOSED_TASKS })

export const createTask = task => ({ type: CREATE_TASK, payload: task })

export const closeTaskAction = id => ({ type: CLOSE_TASK, payload: id })

export const undoCloseTaskAction = id => ({ type: UNDO_CLOSE_TASK, payload: id })

export const updateTaskAction = task => ({ type: UPDATE_TASK, payload: task })

export const deleteTaskAction = id => ({ type: DELETE_TASK, payload: id })
