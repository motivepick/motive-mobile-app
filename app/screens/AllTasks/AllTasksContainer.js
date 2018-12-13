import { bindActionCreators } from 'redux'
import {
    closeTaskAction,
    createTaskAction,
    deleteTaskAction,
    resetClosedTasksAction,
    showMoreTasksAction,
    undoCloseTaskAction,
    updateUserTasksAction
} from '../../actions/tasksActions'
import { closeTask, doCreateTask, doDeleteTask, fetchTasks, undoCloseTask } from '../../services/taskService'
import connect from 'react-redux/es/connect/connect'
import { translate } from 'react-i18next'
import { AllTasksView } from './AllTasksView'
import { orderTasksByClosingDate, orderTasksByCreated } from '../../utils/order'
import { toast } from '../../utils/toast'

const open = (tasks) => orderTasksByCreated(tasks.filter(t => !t.closed))

const closed = (tasks) => orderTasksByClosingDate(tasks.filter(t => t.closed))

const mapStateToProps = state => {
    const { tasks, totalClosedTasksShown } = state.tasks
    const closedTasks = closed(tasks)
    return ({
        tasks: open(tasks),
        closedTasks: closedTasks.slice(0, totalClosedTasksShown),
        totalClosedTasks: closedTasks.length
    })
}

const mapDispatchToProps = (dispatch) => bindActionCreators({

    updateUserTasks: () => async (dispatch) => {
        try {
            return dispatch(updateUserTasksAction(await fetchTasks()))
        } catch (e) {
            toast()
        }
    },

    createTask: task => async (dispatch) => {
        try {
            return dispatch(createTaskAction(await doCreateTask(task)))
        } catch (e) {
            toast()
        }
    },

    closeOrUndoCloseTask: (id: number, newStateOfTaskIsClosed: boolean) => async (dispatch) => {
        try {
            if (newStateOfTaskIsClosed) {
                dispatch(closeTaskAction(await closeTask(id)))
            } else {
                dispatch(undoCloseTaskAction(await undoCloseTask(id)))
            }
        } catch (e) {
            toast()
        }
    },

    deleteTask: id => async dispatch => {
        try {
            await doDeleteTask(id)
            dispatch(deleteTaskAction(id))
        } catch (e) {
            toast()
        }
    },

    onMoreTasksRequested: () => dispatch => dispatch(showMoreTasksAction()),

    resetClosedTasks: () => dispatch => dispatch(resetClosedTasksAction()),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(AllTasksView))
