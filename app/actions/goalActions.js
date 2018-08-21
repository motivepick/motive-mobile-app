import Config from 'react-native-config'
import request from 'superagent'
import { AsyncStorage } from 'react-native'

export const CHANGE_NEW_GOAL_NAME = 'CHANGE_NEW_GOAL_NAME'
export const CREATE_NEW_GOAL = 'CREATE_NEW_GOAL'
export const UPDATE_USER_GOALS = 'UPDATE_USER_GOALS'
export const SET_GOAL = 'SET_GOAL'

export const changeNewGoalName = newGoalName => ({ type: CHANGE_NEW_GOAL_NAME, payload: newGoalName })

export const createNewGoal = async goal => {
    const accountId = await AsyncStorage.getItem('accountId')
    const response = await request.post(`${Config.API_URL}/goals`).set('X-Account-Id', accountId).send(goal)
    const goalWithId = response.body
    return { type: CREATE_NEW_GOAL, payload: goalWithId }
}

export const setGoal = (id, type) => ({ type: SET_GOAL, payload: { id, type } })

export const updateUserGoals = goals => ({ type: UPDATE_USER_GOALS, payload: goals })
