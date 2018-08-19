import { combineReducers } from 'redux'

import UserReducer from './userReducer'
import TaskReducer from './taskReducer'
import GoalReducer from './goalReducer'

const rootReducer = combineReducers({
    user: UserReducer,
    tasks: TaskReducer,
    goals: GoalReducer
})

export default rootReducer
