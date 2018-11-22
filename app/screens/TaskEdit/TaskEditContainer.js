import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeTaskNameAction, setTaskAction, updateTaskAction } from '../../actions/tasksActions'
import { translate } from 'react-i18next'
import { TaskEditView } from './TaskEditView'
import { updateTask } from '../../services/taskService'

const mapStateToProps = state => ({
    task: state.tasks.task,
    goals: state.goals.goals
})

const mapDispatchToProps = dispatch => bindActionCreators({

    setTask: task => dispatch => dispatch(setTaskAction(task)),

    changeTaskName: taskName => dispatch => dispatch(changeTaskNameAction(taskName)),

    saveTask: task => async dispatch => {
        const { id, name, description, dueDate } = task
        dispatch(updateTaskAction(await updateTask(id, { name, description, dueDate })))
    },
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(TaskEditView))
