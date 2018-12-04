import request from 'superagent'
import { orderTasksByDate } from '../utils/order'
import { API_URL } from '../const'
import { fetchToken } from './accountService'
import { formatDateInIso, parseDateInIso } from '../utils/dateFormat'

const formatDueDateOf = (task) => task.dueDate ? formatDateInIso(task.dueDate) : ''

const parseDueDateOf = (task) => task.dueDate ? parseDateInIso(task.dueDate) : null

export const fetchTasks = async () => {
    const token = await fetchToken()
    const { body } = await request.get(`${API_URL}/tasks`).set('Cookie', token)
    return orderTasksByDate(body.map(t => ({ ...t, dueDate: parseDueDateOf(t) })))
}

export const closeTask = async id => {
    const token = await fetchToken()
    const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send({ closed: true })
    return { ...body, dueDate: parseDueDateOf(body) }
}

export const undoCloseTask = async id => {
    const token = await fetchToken()
    const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send({ closed: false })
    return { ...body, dueDate: parseDueDateOf(body) }
}

export const updateTask = async (id, task) => {
    const token = await fetchToken()
    const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send({ ...task, dueDate: formatDueDateOf(task) })
    return { ...body, dueDate: parseDueDateOf(body) }
}

export const doDeleteTask = async id => {
    const token = await fetchToken()
    await request.del(`${API_URL}/tasks/${id}`).set('Cookie', token)
}
