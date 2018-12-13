import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { deleteTaskAction, setTaskAction, updateTaskAction } from '../../actions/tasksActions'
import { translate } from 'react-i18next'
import { TaskEditView } from './TaskEditView'
import { doDeleteTask, updateTask } from '../../services/taskService'
import { toast } from '../../utils/toast'

const mapStateToProps = state => ({
    task: state.tasks.task
})

const mapDispatchToProps = dispatch => bindActionCreators({

    setTask: task => dispatch => dispatch(setTaskAction(task)),

    saveTask: task => async dispatch => {
        try {
            const { id, name, description, dueDate, deleteDueDate } = task
            dispatch(updateTaskAction(await updateTask(id, { name, description, dueDate, deleteDueDate })))
        } catch {
            toast()
        }
    },

    deleteTask: id => async dispatch => {
        try {
            await doDeleteTask(id)
            dispatch(deleteTaskAction(id))
        } catch {
            toast()
        }
    },
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(TaskEditView))
