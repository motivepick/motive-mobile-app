import request from 'superagent'
import moment from 'moment'
import { orderTasksByDate } from '../utils/order'
import { API_URL } from '../const'
import { fetchToken } from './accountService'

const all = async (goalId) => {
    const token = await fetchToken()
    const { body } = await request.get(goalId ? `${API_URL}/goals/${goalId}/tasks` : `${API_URL}/tasks`).set('Cookie', token)
    return orderTasksByDate(body)
}

const today = async (goalId) => {
    const token = await fetchToken()
    const response = await request.get(goalId ? `${API_URL}/goals/${goalId}/tasks` : `${API_URL}/tasks`).set('Cookie', token)
    const tasks = response.body
    const endOfDay = moment().endOf('day')
    return orderTasksByDate(tasks.filter(t => t.dueDate && moment(t.dueDate).isBefore(endOfDay)))
}

const thisWeek = async (goalId) => {
    const token = await fetchToken()
    const response = await request.get(goalId ? `${API_URL}/goals/${goalId}/tasks` : `${API_URL}/tasks`).set('Cookie', token)
    const tasks = response.body
    const endOfWeek = moment().endOf('week')
    return orderTasksByDate(tasks.filter(t => t.dueDate && moment(t.dueDate).isBefore(endOfWeek)))
}

export const fetchTasks = (listFilter, goalId) => {
    if (listFilter === 'all') {
        return all(goalId)
    } else if (listFilter === 'today') {
        return today(goalId)
    } else if (listFilter === 'thisWeek') {
        return thisWeek(goalId)
    } else {
        return all(goalId)
    }
}

export const fetchClosedTasks = async () => {
    const token = await fetchToken()
    const { body } = await request.get(`${API_URL}/tasks`).query({ closed: true }).set('Cookie', token)
    return body
}

export const fetchSchedule = async () => {
    const token = await fetchToken()
    const { body } = await request.get(`${API_URL}/tasks/schedule`).set('Cookie', token)
    return body
}

export const closeTask = async id => {
    const token = await fetchToken()
    const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send({ closed: true })
    return body
}

export const undoCloseTask = async id => {
    const token = await fetchToken()
    const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send({ closed: false })
    return body
}

export const updateTask = async (id, task) => {
    const token = await fetchToken()
    const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send(task)
    return body
}

export const doDeleteTask = async id => {
    const token = await fetchToken()
    const { body } = await request.del(`${API_URL}/tasks/${id}`).set('Cookie', token)
    return body
}
