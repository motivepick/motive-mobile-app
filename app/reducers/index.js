import { combineReducers } from 'redux'
import TasksReducer from './tasksReducer'
import GoalsReducer from './goalsReducer'

const rootReducer = combineReducers({
    tasks: TasksReducer,
    goals: GoalsReducer
})

export default rootReducer
