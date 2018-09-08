import request from 'superagent'
import { API_URL } from '../const'
import { fetchToken } from './accountService'

export const doDeleteGoal = async id => {
    const token = await fetchToken()
    const { body } = await request.del(`${API_URL}/goals/${id}`).set('Cookie', token)
    return body
}
