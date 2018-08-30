import { AsyncStorage } from 'react-native'
import request from 'superagent'
import Config from 'react-native-config'
import moment from 'moment'
import { orderTasksByDate } from '../utils/order'

export const all = async () => {
    const accountId = await AsyncStorage.getItem('accountId')
    const { body } = await request.get(`${Config.API_URL}/tasks`).set('X-Account-Id', accountId)
    return orderTasksByDate(body)
}

export const today = async () => {
    const accountId = await AsyncStorage.getItem('accountId')
    const response = await request.get(`${Config.API_URL}/tasks`).set('X-Account-Id', accountId)
    const tasks = response.body
    const endOfDay = moment().endOf('day')
    return orderTasksByDate(tasks.filter(t => t.dueDate && moment(t.dueDate).isBefore(endOfDay)))
}

export const thisWeek = async () => {
    const accountId = await AsyncStorage.getItem('accountId')
    const response = await request.get(`${Config.API_URL}/tasks`).set('X-Account-Id', accountId)
    const tasks = response.body
    const endOfWeek = moment().endOf('week')
    return orderTasksByDate(tasks.filter(t => t.dueDate && moment(t.dueDate).isBefore(endOfWeek)))
}
