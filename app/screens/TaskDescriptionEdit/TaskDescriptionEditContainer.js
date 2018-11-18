import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setTaskAction } from '../../actions/taskActions'
import request from 'superagent'
import { API_URL } from '../../const'
import { updateTaskAction } from '../../actions/tasksActions'
import { translate } from 'react-i18next'
import { TaskDescriptionEditView } from './TaskDescriptionEditView'

const mapStateToProps = state => ({
    task: state.task.task
})

const mapDispatchToProps = dispatch => bindActionCreators({

    setTask: task => dispatch => dispatch(setTaskAction(task)),

    saveTask: task => async dispatch => {
        const token = await AsyncStorage.getItem('token')
        const { id, name, description, dueDate } = task
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send({ name, description, dueDate })
        dispatch(updateTaskAction(body))
    },
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(TaskDescriptionEditView))
