import Config from 'react-native-config'
import request from 'superagent'
import { AsyncStorage } from 'react-native'

export const CHANGE_NEW_GOAL_NAME = 'CHANGE_NEW_GOAL_NAME'
export const CREATE_NEW_GOAL = 'CREATE_NEW_GOAL'
export const SEARCH_USER_GOALS = 'SEARCH_USER_GOALS'
export const UPDATE_USER_GOALS = 'UPDATE_USER_GOALS'
export const SHOW_ERROR = 'SHOW_ERROR'

export const changeNewGoalName = newGoalName => ({ type: CHANGE_NEW_GOAL_NAME, payload: newGoalName })

export const createNewGoal = async goal => {
    const accountId = await AsyncStorage.getItem('accountId')
    const response = await request.post(`${Config.API_URL}/goals`).set('X-Account-Id', accountId).send(goal)
    const goalWithId = response.body
    return { type: CREATE_NEW_GOAL, payload: goalWithId }
}

export const searchUserGoals = accountId => {
    const goals = request.get(`${Config.API_URL}/goals`).set('X-Account-Id', accountId)
    return { type: SEARCH_USER_GOALS, payload: goals }
}

export const updateUserGoals = query => ({ type: UPDATE_USER_GOALS, query: query })

export const showError = error => ({ type: SHOW_ERROR, error })
