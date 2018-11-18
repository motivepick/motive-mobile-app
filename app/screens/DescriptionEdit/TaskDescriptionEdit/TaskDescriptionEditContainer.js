import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeTaskDescriptionAction, setTaskAction, updateTaskAction } from '../../../actions/tasksActions'
import request from 'superagent'
import { API_URL } from '../../../const'
import { translate } from 'react-i18next'
import { DescriptionEditView } from '../DescriptionEditView'

const mapStateToProps = state => ({
    editableEntity: state.tasks.task
})

const mapDispatchToProps = dispatch => bindActionCreators({

    setEditableEntity: navigation => dispatch => {
        const task = navigation.getParam('task')
        dispatch(setTaskAction(task))
    },

    setDescription: description => dispatch => dispatch(changeTaskDescriptionAction(description)),

    saveEditableEntity: entity => async dispatch => {
        const token = await AsyncStorage.getItem('token')
        const { id, description } = entity
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send({ description })
        dispatch(updateTaskAction(body))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(DescriptionEditView))
