import React, { Component } from 'react'
import { AsyncStorage, TextInput, View } from 'react-native'
import styles from '../components/TaskList/TaskList.styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeTaskDescriptionAction, changeTaskNameAction, saveTaskAction, setTaskAction } from '../actions/taskActions'
import request from 'superagent'
import { API_URL } from '../const'
import { updateTaskAction } from '../actions/tasksActions'
import { translate } from 'react-i18next'

class TaskScreen extends Component {

    componentDidMount() {
        const { navigation, setTask } = this.props
        const task = navigation.getParam('task')
        setTask(task)
    }

    render() {
        const { task, changeTaskName, changeTaskDescription, t } = this.props
        return (
            <View>
                <TextInput
                    style={styles.input /* TODO: use correct styles */}
                    onChangeText={changeTaskName}
                    value={task.name}
                    onSubmitEditing={this.saveTaskName}
                    placeholder={t('placeholders.taskName')}/>
                <TextInput
                    style={styles.input /* TODO: use correct styles */}
                    onChangeText={changeTaskDescription}
                    value={task.description}
                    onSubmitEditing={this.saveTaskDescription}
                    placeholder={t('placeholders.taskDescription')}/>
            </View>
        )
    }

    saveTaskName = () => {
        const { task, saveTaskName } = this.props
        saveTaskName(task)
    }

    saveTaskDescription = () => {
        const { task, saveTaskDescription } = this.props
        saveTaskDescription(task)
    }
}

const mapStateToProps = state => ({
    task: state.task.task
})

const mapDispatchToProps = dispatch => bindActionCreators({

    setTask: task => dispatch => dispatch(setTaskAction(task)),

    changeTaskName: taskName => dispatch => dispatch(changeTaskNameAction(taskName)),

    changeTaskDescription: taskDescription => dispatch => dispatch(changeTaskDescriptionAction(taskDescription)),

    saveTaskName: task => async dispatch => {
        const accountId = await AsyncStorage.getItem('accountId')
        const { id, name } = task
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('X-Account-Id', accountId).send({ name })
        dispatch(saveTaskAction(body))
        dispatch(updateTaskAction(body))
    },

    saveTaskDescription: task => async dispatch => {
        const accountId = await AsyncStorage.getItem('accountId')
        const { id, description } = task
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('X-Account-Id', accountId).send({ description })
        dispatch(saveTaskAction(body))
        dispatch(updateTaskAction(body))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(TaskScreen))
