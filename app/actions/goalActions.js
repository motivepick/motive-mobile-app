import Config from 'react-native-config'
import request from 'superagent'

export const SEARCH_USER_GOALS = 'SEARCH_USER_GOALS'
export const UPDATE_USER_GOALS = 'UPDATE_USER_GOALS'
export const SET_GOAL = 'SET_GOAL'
export const SHOW_ERROR = 'SHOW_ERROR'

export const searchUserGoals = accountId => {
    const goals = request.get(`${Config.API_URL}/goals/list/${accountId}`)
    return {
        type: SEARCH_USER_GOALS,
        payload: goals
    }
}

export const updateUserGoals = query => ({
    type: UPDATE_USER_GOALS,
    query: query
})

export const showError = error => ({
    type: SHOW_ERROR,
    error
})
