import request from 'superagent'
import { API_URL } from '../const'
import { fetchAccountId } from './accountService'

export const doDeleteGoal = async id => {
    const accountId = await fetchAccountId()
    const { body } = await request.del(`${API_URL}/goals/${id}`).set('X-Account-Id', accountId)
    return body
}
