import { combineReducers } from 'redux'
import UserReducer from './userReducer'
import TasksReducer from './tasksReducer'
import GoalsReducer from './goalsReducer'
import TaskReducer from './taskReducer'

const rootReducer = combineReducers({
    user: UserReducer,
    tasks: TasksReducer,
    task: TaskReducer,
    goals: GoalsReducer
})

export default rootReducer
