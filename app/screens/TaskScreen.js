import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeTaskDescriptionAction, changeTaskDueDateAction, changeTaskNameAction, setTaskAction } from '../actions/taskActions'
import request from 'superagent'
import { API_URL } from '../const'
import { updateTaskAction } from '../actions/tasksActions'
import { translate } from 'react-i18next'
import { Container, Content, Form, Input, Item, Label } from 'native-base'
import DueDatePicker from '../components/DueDatePicker/DueDatePicker'
import Header from '../components/CustomHeader/CustomHeader'

class TaskScreen extends Component {

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        const { navigation, setTask } = this.props
        const task = navigation.getParam('task')
        setTask(task)
    }

    render() {
        const { task, changeTaskName, changeTaskDescription, changeTaskDueDate, navigation, t } = this.props
        const { name, description, dueDate } = task
        return (
            <Container>
                <Content>
                    <Header title={t('labels.editTask')} onLeftButtonPress={() => navigation.goBack()} onRightButtonPress={() => this.saveTask()}/>
                    <Form>
                        <Item floatingLabel>
                            <Label>{t('labels.task')}</Label>
                            <Input onChangeText={changeTaskName} value={name} onSubmitEditing={this.saveTask}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>{t('labels.description')}</Label>
                            <Input onChangeText={changeTaskDescription} value={description} onSubmitEditing={this.saveTaskDescription}
                                style={{ height: 200 }} multiline={true} numberOfLines={5}/>
                        </Item>
                        <Item>
                            <DueDatePicker value={dueDate} onChangeDate={changeTaskDueDate}/>
                        </Item>
                    </Form>
                </Content>
            </Container>
        )
    }

    saveTask = () => {
        const { task, navigation, saveTask } = this.props
        saveTask(task)
        navigation.goBack()
    }
}

const mapStateToProps = state => ({
    task: state.task.task
})

const mapDispatchToProps = dispatch => bindActionCreators({

    setTask: task => dispatch => dispatch(setTaskAction(task)),

    changeTaskName: taskName => dispatch => dispatch(changeTaskNameAction(taskName)),

    changeTaskDescription: taskDescription => dispatch => dispatch(changeTaskDescriptionAction(taskDescription)),

    changeTaskDueDate: dueDate => dispatch => dispatch(changeTaskDueDateAction(dueDate)),

    saveTask: task => async dispatch => {
        const accountId = await AsyncStorage.getItem('accountId')
        const { id, name, description, dueDate } = task
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('X-Account-Id', accountId).send({ name, description, dueDate })
        dispatch(updateTaskAction(body))
    },
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(TaskScreen))
