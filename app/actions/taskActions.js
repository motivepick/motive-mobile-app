import request from 'superagent'
import { API_URL } from '../const'
import Config from 'react-native-config'
import { AsyncStorage } from 'react-native'

export const CHANGE_NEW_TASK_NAME = 'CHANGE_NEW_TASK_NAME'
export const SEARCH_USER_TASKS = 'SEARCH_USER_TASKS'
export const UPDATE_USER_TASKS = 'UPDATE_USER_TASKS'
export const SHOW_ERROR = 'SHOW_ERROR'
export const CREATE_TASK = 'CREATE_TASK'
export const CLOSE_TASK = 'CLOSE_TASK'
export const UPDATE_TASK = 'UPDATE_TASK'

export const changeNewTaskName = newTaskName => ({ type: CHANGE_NEW_TASK_NAME, payload: newTaskName })

export const searchUserTasks = accountId => {
    const response = request.get(`${API_URL}/tasks`).set('X-Account-Id', accountId)
    return { type: SEARCH_USER_TASKS, payload: response }
}

export const updateUserTasks = query => ({ type: UPDATE_USER_TASKS, query: query })

export const showError = error => ({ type: SHOW_ERROR, error })

export const createTask = async task => {
    const accountId = await AsyncStorage.getItem('accountId')
    const response = request.post(`${API_URL}/tasks`).set('X-Account-Id', accountId).send(task)
    return { type: CREATE_TASK, payload: response }
}

export const closeTask = async (taskId) => {
    const accountId = await AsyncStorage.getItem('accountId')
    const response = await fetch(`${Config.API_URL}/tasks/${taskId}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Account-Id': accountId
            },
            body: JSON.stringify({ closed: true })
        }
    )
    const task = await response.json()
    return { type: CLOSE_TASK, payload: task.id }
}

export const updateTask = (taskId, task) => {
    const response = request.put(`${API_URL}/tasks/${taskId}`).send(task)
    return { type: UPDATE_TASK, payload: response }
}
