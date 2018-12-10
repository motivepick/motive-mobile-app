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
import { closeTask, doCreateTask, doDeleteTask, fetchTasks, undoCloseTask } from '../../services/taskService'
import connect from 'react-redux/es/connect/connect'
import { translate } from 'react-i18next'
import { AllTasksView } from './AllTasksView'
import { orderTasksByClosingDate, orderTasksByCreated } from '../../utils/order'

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

const mapDispatchToProps = dispatch => bindActionCreators({

    updateUserTasks: () => async (dispatch) => dispatch(updateUserTasksAction(await fetchTasks())),

    createTask: task => async (dispatch) => dispatch(createTask(await doCreateTask(task))),

    closeOrUndoCloseTask: (id: number, newStateOfTaskIsClosed: boolean) => async dispatch => {
        if (newStateOfTaskIsClosed) {
            dispatch(closeTaskAction(await closeTask(id)))
        } else {
            dispatch(undoCloseTaskAction(await undoCloseTask(id)))
        }
    },

    deleteTask: id => async dispatch => {
        await doDeleteTask(id)
        dispatch(deleteTaskAction(id))
    },

    onMoreTasksRequested: () => dispatch => dispatch(showMoreTasksAction()),

    resetClosedTasks: () => dispatch => dispatch(resetClosedTasksAction()),
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(AllTasksView))
