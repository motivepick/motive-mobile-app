import { bindActionCreators } from 'redux'
import { closeTaskAction, deleteTaskAction, undoCloseTaskAction } from '../../actions/tasksActions'
import { closeTask, doDeleteTask, undoCloseTask } from '../../services/taskService'
import connect from 'react-redux/es/connect/connect'
import { translate } from 'react-i18next'
import { ScheduleView } from './ScheduleView'
import { schedule } from '../../utils/schedule'
import { toast } from '../../utils/toast'

const mapStateToProps = state => ({
    schedule: schedule(state.tasks.tasks)
})

const mapDispatchToProps = dispatch => bindActionCreators({

    closeTask: id => async dispatch => {
        try {
            return dispatch(closeTaskAction(await closeTask(id)))
        } catch {
            toast()
        }
    },

    undoCloseTask: id => async dispatch => {
        try {
            return dispatch(undoCloseTaskAction(await undoCloseTask(id)))
        } catch {
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
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(ScheduleView))
