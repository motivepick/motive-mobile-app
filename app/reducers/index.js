import { combineReducers } from 'redux'
import UserReducer from './userReducer'
import TasksReducer from './tasksReducer'
import GoalsReducer from './goalsReducer'

const rootReducer = combineReducers({
    user: UserReducer,
    tasks: TasksReducer,
    goals: GoalsReducer
})

export default rootReducer
