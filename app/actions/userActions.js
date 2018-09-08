import request from 'superagent'
import { API_URL } from '../const'

export const LOGOUT = 'LOGOUT'

export const logout = (token) => {
    const response = request.delete(`${API_URL}/users`).set('Cookie', token);
    return { type: LOGOUT, payload: response }
}
