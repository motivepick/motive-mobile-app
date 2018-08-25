import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeTaskDescriptionAction, changeTaskNameAction, saveTaskAction, setTaskAction } from '../actions/taskActions'
import request from 'superagent'
import { API_URL } from '../const'
import { updateTaskAction } from '../actions/tasksActions'
import { translate } from 'react-i18next'
import { Container, Content, Form, Input, Item, Label } from 'native-base'
import DueDatePicker from '../components/DueDatePicker/DueDatePicker'

class TaskScreen extends Component {

    static navigationOptions = {
        title: 'Edit task' // Can use this screen for 'Create task', too.
    }

    componentDidMount() {
        const { navigation, setTask } = this.props
        const task = navigation.getParam('task')
        setTask(task)
    }

    render() {
        const { task, changeTaskName, changeTaskDescription, t } = this.props
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>{t('labels.task')}</Label>
                            <Input onChangeText={changeTaskName} value={task.name} onSubmitEditing={this.saveTaskName}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>{t('labels.description')}</Label>
                            <Input onChangeText={changeTaskDescription} value={task.description} onSubmitEditing={this.saveTaskDescription} style={{ height: 200 }} multiline={true} numberOfLines={5}/>
                        </Item>
                        <Item>
                            <DueDatePicker/>
                        </Item>
                    </Form>
                </Content>
            </Container>
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
