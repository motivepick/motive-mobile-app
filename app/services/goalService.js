import request from 'superagent'
import { API_URL } from '../const'
import { fetchToken } from './accountService'
import moment from 'moment'

const today = async (goalId, task) => {
    const token = await fetchToken()
    const { body } = await request.post(`${API_URL}/goals/${goalId}/tasks`)
        .set('Cookie', token).send({ ...task, dueDate: moment().endOf('day') })
    return body
}

const thisWeek = async (goalId, task) => {
    const token = await fetchToken()
    const { body } = await request.post(`${API_URL}/goals/${goalId}/tasks`)
        .set('Cookie', token).send({ ...task, dueDate: moment().endOf('week') })
    return body
}

const all = async (goalId, task) => {
    const token = await fetchToken()
    const { body } = await request.post(`${API_URL}/goals/${goalId}/tasks`).set('Cookie', token).send(task)
    return body
}

export const updateGoal = async (id, goal) => {
    const token = await fetchToken()
    const { body } = await request.put(`${API_URL}/goals/${id}`).set('Cookie', token).send(goal)
    return body
}

export const doDeleteGoal = async id => {
    const token = await fetchToken()
    const { body } = await request.del(`${API_URL}/goals/${id}`).set('Cookie', token)
    return body
}

export const createTask = async (listFilter, goalId, task) => {
    if (listFilter === 'today') {
        return today(goalId, task)
    } else if (listFilter === 'thisWeek') {
        return thisWeek(goalId, task)
    } else {
        return all(goalId, task)
    }
}
