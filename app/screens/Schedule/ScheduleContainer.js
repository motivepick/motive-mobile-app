import { bindActionCreators } from 'redux'
import { closeTaskAction, deleteTaskAction, undoCloseTaskAction } from '../../actions/tasksActions'
import { closeTask, doDeleteTask, undoCloseTask } from '../../services/taskService'
import connect from 'react-redux/es/connect/connect'
import { translate } from 'react-i18next'
import { ScheduleView } from './ScheduleView'
import { schedule } from '../../utils/schedule'

const mapStateToProps = state => ({
    schedule: schedule(state.tasks.tasks)
})

const mapDispatchToProps = dispatch => bindActionCreators({

    closeTask: id => async dispatch => dispatch(closeTaskAction(await closeTask(id))),

    undoCloseTask: id => async dispatch => dispatch(undoCloseTaskAction(await undoCloseTask(id))),

    deleteTask: id => async dispatch => {
        await doDeleteTask(id)
        dispatch(deleteTaskAction(id))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(ScheduleView))
