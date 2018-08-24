import { combineReducers } from 'redux'
import UserReducer from './userReducer'
import TasksReducer from './tasksReducer'
import GoalsReducer from './goalsReducer'
import TaskReducer from './taskReducer'
import * as moment from 'moment'

moment.updateLocale('en', {
    calendar: {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: 'DD.MM.YYYY',
        sameElse: 'DD.MM.YYYY'
    }
})

const rootReducer = combineReducers({
    user: UserReducer,
    tasks: TasksReducer,
    task: TaskReducer,
    goals: GoalsReducer
})

export default rootReducer
