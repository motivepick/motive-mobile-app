import { bindActionCreators } from 'redux'
import { closeTaskAction, createTask, deleteTaskAction, undoCloseTaskAction, updateUserScheduleAction } from '../../actions/tasksActions'
import { doDeleteTask, fetchSchedule } from '../../services/taskService'
import { fetchToken } from '../../services/accountService'
import request from 'superagent'
import { API_URL } from '../../const'
import moment from 'moment'
import { doDeleteGoal } from '../../services/goalService'
import { createNewGoalAction, deleteGoalAction, updateUserGoalsAction } from '../../actions/goalsActions'
import connect from 'react-redux/es/connect/connect'
import { translate } from 'react-i18next'
import { ScheduleView } from './ScheduleView'

const mapStateToProps = state => ({
    tasks: state.tasks.tasks,
    closedTasks: state.tasks.closedTasks,
    closedTasksAreShown: state.tasks.closedTasksAreShown,
    schedule: state.tasks.schedule,
    goals: state.goals.goals
})

const mapDispatchToProps = dispatch => bindActionCreators({

    updateUserSchedule: () => async dispatch => dispatch(updateUserScheduleAction(await fetchSchedule())),

    createTask: task => async dispatch => {
        const token = await fetchToken()
        const { body } = await request.post(`${API_URL}/tasks`).set('Cookie', token).send({ ...task, dueDate: moment().endOf('day') })
        dispatch(createTask(body))
    },

    undoCloseTask: id => async dispatch => {
        const token = await fetchToken()
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send({ closed: false })
        dispatch(undoCloseTaskAction(body.id))
    },

    closeTask: id => async dispatch => {
        const token = await fetchToken()
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send({ closed: true })
        dispatch(closeTaskAction(body.id))
    },

    deleteTask: id => async dispatch => {
        await doDeleteTask(id)
        dispatch(deleteTaskAction(id))
    },

    deleteGoal: id => async dispatch => {
        await doDeleteGoal(id)
        dispatch(deleteGoalAction(id))
    },

    updateUserGoals: () => async dispatch => {
        const token = await fetchToken()
        const { body } = await request.get(`${API_URL}/goals`).set('Cookie', token)
        dispatch(updateUserGoalsAction(body))
    },

    createGoal: goal => async dispatch => {
        const token = await fetchToken()
        const { body } = await request.post(`${API_URL}/goals`).set('Cookie', token).send(goal)
        dispatch(createNewGoalAction(body))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(ScheduleView))
