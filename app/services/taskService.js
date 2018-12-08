import request from 'superagent'
import { API_URL } from '../const'
import { fetchToken } from './accountService'
import { formatDateInIso, parseDateInIso } from '../utils/dateFormat'
import moment from 'moment'

const DATE_PROPERTY_NAMES = ['created', 'dueDate', 'closingDate']

const convertDates = (task, converter) => {
    const dates = {}
    Object.getOwnPropertyNames(task).forEach(key => {
        if (DATE_PROPERTY_NAMES.includes(key)) {
            const value = task[key]
            dates[key] = value ? converter(value) : null
        }
    })
    return { ...task, ...dates }
}

const formatDates = (task) => convertDates(task, formatDateInIso)

const parseDates = (task) => convertDates(task, parseDateInIso)

export const doCreateTask = async (task) => {
    const token = await fetchToken()
    const { body } = await request.post(`${API_URL}/tasks`).set('Cookie', token).send(formatDates(task))
    return parseDates(body)
}

export const fetchTasks = async () => {
    const token = await fetchToken()
    const { body } = await request.get(`${API_URL}/tasks`).set('Cookie', token)
    return body.map(t => parseDates(t))
}

export const closeTask = async id => {
    const token = await fetchToken()
    const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send(formatDates({ closed: true, closingDate: moment() }))
    return parseDates(body)
}

export const undoCloseTask = async id => {
    const token = await fetchToken()
    const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send({ closed: false, created: moment() })
    return parseDates(body)
}

export const updateTask = async (id, task) => {
    const token = await fetchToken()
    const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send(formatDates(task))
    return parseDates(body)
}

export const doDeleteTask = async id => {
    const token = await fetchToken()
    await request.del(`${API_URL}/tasks/${id}`).set('Cookie', token)
}
