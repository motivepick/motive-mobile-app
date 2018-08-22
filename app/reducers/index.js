import { combineReducers } from 'redux'
import UserReducer from './userReducer'
import TaskReducer from './taskReducer'
import GoalReducer from './goalReducer'
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
    tasks: TaskReducer,
    goals: GoalReducer
})

export default rootReducer
