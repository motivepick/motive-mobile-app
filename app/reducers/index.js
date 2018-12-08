import { combineReducers } from 'redux'
import TasksReducer from './tasksReducer'

const rootReducer = combineReducers({
    tasks: TasksReducer
})

export default rootReducer
