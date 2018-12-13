import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeTaskDescriptionAction, setTaskAction, updateTaskAction } from '../../../actions/tasksActions'
import { translate } from 'react-i18next'
import { DescriptionEditView } from '../DescriptionEditView'
import { updateTask } from '../../../services/taskService'
import { toast } from '../../../utils/toast'

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
        try {
            const { id, description } = entity
            const task = await updateTask(id, { description })
            dispatch(updateTaskAction(task))
        } catch {
            toast()
        }
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(DescriptionEditView))
