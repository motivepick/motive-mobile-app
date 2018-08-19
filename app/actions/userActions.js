import request from 'superagent'
import { API_URL } from '../const'

export const CREATE_USER = 'CREATE_USER'
export const LOAD_USER = 'LOAD_USER'
export const SET_USER = 'SET_USER'
export const LOGOUT = 'LOGOUT'
export const REMOVE_USER = 'REMOVE_USER'

export const createUserData = (user) => {
    const req = request.post(`${API_URL}/users`).send(user)

    return {
        type: CREATE_USER,
        payload: req
    }
}

export const loadUserData = (accountId) => {
    const req = request.get(`${API_URL}/users/${accountId}`)

    return {
        type: LOAD_USER,
        payload: req
    }
}

export const setUser = (user) => ({ type: SET_USER, user })

export const logout = (accountId) => {
    const req = request.delete(`${API_URL}/users/${accountId}`)
    return {
        type: LOGOUT,
        payload: req
    }
}

export const removeUser = () => ({ type: REMOVE_USER })
