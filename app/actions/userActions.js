import request from 'superagent'
import { API_URL } from '../const'

export const LOGOUT = 'LOGOUT'

export const logout = (accountId) => {
    const response = request.delete(`${API_URL}/users/${accountId}`)
    return { type: LOGOUT, payload: response }
}
