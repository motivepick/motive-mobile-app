import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deleteTaskAction, setTaskAction, updateTaskAction } from '../../actions/tasksActions'
import { translate } from 'react-i18next'
import { TaskEditView } from './TaskEditView'
import { doDeleteTask, updateTask } from '../../services/taskService'

const mapStateToProps = state => ({
    task: state.tasks.task
})

const mapDispatchToProps = dispatch => bindActionCreators({

    setTask: task => dispatch => dispatch(setTaskAction(task)),

    saveTask: task => async dispatch => {
        const { id, name, description, dueDate, deleteDueDate } = task
        dispatch(updateTaskAction(await updateTask(id, { name, description, dueDate, deleteDueDate })))
    },

    deleteTask: id => async dispatch => {
        await doDeleteTask(id)
        dispatch(deleteTaskAction(id))
    },
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(TaskEditView))
