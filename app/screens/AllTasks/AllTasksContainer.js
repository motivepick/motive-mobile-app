import { bindActionCreators } from 'redux'
import {
    closeTaskAction,
    createTask,
    deleteTaskAction,
    resetClosedTasksAction,
    showMoreTasksAction,
    undoCloseTaskAction,
    updateUserTasksAction
} from '../../actions/tasksActions'
import { closeTask, doDeleteTask, fetchTasks, undoCloseTask } from '../../services/taskService'
import { fetchToken } from '../../services/accountService'
import request from 'superagent'
import { API_URL } from '../../const'
import moment from 'moment'
import connect from 'react-redux/es/connect/connect'
import { translate } from 'react-i18next'
import { AllTasksView } from './AllTasksView'

const open = (tasks) => tasks.filter(t => !t.closed)

const closed = (tasks) => tasks.filter(t => t.closed)

const mapStateToProps = state => {
    const closedTasks = closed(state.tasks.tasks, state.tasks.totalClosedTasksShown)
    return ({
        tasks: open(state.tasks.tasks),
        closedTasks: closedTasks.slice(0, state.tasks.totalClosedTasksShown),
        totalClosedTasks: closedTasks.length
    })
}

const mapDispatchToProps = dispatch => bindActionCreators({

    updateUserTasks: () => async (dispatch) => {
        dispatch(updateUserTasksAction(await fetchTasks('all')))
    },

    createTask: task => async (dispatch, getState) => {
        const { tasks } = getState()
        const { listFilter } = tasks
        const token = await fetchToken()
        if (listFilter === 'today') {
            const { body } = await request.post(`${API_URL}/tasks`).set('Cookie', token).send({
                ...task,
                dueDate: moment().endOf('day')
            })
            dispatch(createTask(body))
        } else if (listFilter === 'thisWeek') {
            const { body } = await request.post(`${API_URL}/tasks`).set('Cookie', token).send({
                ...task,
                dueDate: moment().endOf('week')
            })
            dispatch(createTask(body))
        } else {
            const { body } = await request.post(`${API_URL}/tasks`).set('Cookie', token).send(task)
            dispatch(createTask(body))
        }
    },

    closeTask: id => async dispatch => {
        const task = await closeTask(id)
        dispatch(closeTaskAction(task.id))
    },

    undoCloseTask: id => async dispatch => {
        const task = await undoCloseTask(id)
        dispatch(undoCloseTaskAction(task.id))
    },

    deleteTask: id => async dispatch => {
        await doDeleteTask(id)
        dispatch(deleteTaskAction(id))
    },

    onMoreTasksRequested: () => dispatch => dispatch(showMoreTasksAction()),

    resetClosedTasks: () => dispatch => dispatch(resetClosedTasksAction()),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(AllTasksView))
