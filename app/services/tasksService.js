import { AsyncStorage } from 'react-native'
import request from 'superagent'
import Config from 'react-native-config'
import moment from 'moment'
import { orderTasksByDate } from '../utils/order'

const fetchAccountId = () => AsyncStorage.getItem('accountId')

const all = async () => {
    const accountId = await fetchAccountId()
    const { body } = await request.get(`${Config.API_URL}/tasks`).set('X-Account-Id', accountId)
    return orderTasksByDate(body)
}

const today = async () => {
    const accountId = await fetchAccountId()
    const response = await request.get(`${Config.API_URL}/tasks`).set('X-Account-Id', accountId)
    const tasks = response.body
    const endOfDay = moment().endOf('day')
    return orderTasksByDate(tasks.filter(t => t.dueDate && moment(t.dueDate).isBefore(endOfDay)))
}

const thisWeek = async () => {
    const accountId = await fetchAccountId()
    const response = await request.get(`${Config.API_URL}/tasks`).set('X-Account-Id', accountId)
    const tasks = response.body
    const endOfWeek = moment().endOf('week')
    return orderTasksByDate(tasks.filter(t => t.dueDate && moment(t.dueDate).isBefore(endOfWeek)))
}

export const fetchTasks = filter => {
    if (filter === 'all') {
        return all()
    } else if (filter === 'today') {
        return today()
    } else if (filter === 'thisWeek') {
        return thisWeek()
    } else {
        return all()
    }
}

export const fetchClosedTasks = async () => {
    const accountId = fetchAccountId()
    const { body } = await request.get(`${Config.API_URL}/tasks`).query({ closed: true }).set('X-Account-Id', accountId)
    return body
}
