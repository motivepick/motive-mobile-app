import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeTaskNameAction, setTaskAction, updateTaskAction } from '../../actions/tasksActions'
import request from 'superagent'
import { API_URL } from '../../const'
import { translate } from 'react-i18next'
import { fetchToken } from '../../services/accountService'
import { TaskEditView } from './TaskEditView'

const mapStateToProps = state => ({
    task: state.tasks.task,
    goals: state.goals.goals
})

const mapDispatchToProps = dispatch => bindActionCreators({

    setTask: task => dispatch => dispatch(setTaskAction(task)),

    changeTaskName: taskName => dispatch => dispatch(changeTaskNameAction(taskName)),

    saveTask: task => async dispatch => {
        const token = await fetchToken()
        const { id, name, description, dueDate } = task
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send({ name, description, dueDate })
        dispatch(updateTaskAction(body))
    },
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(TaskEditView))
