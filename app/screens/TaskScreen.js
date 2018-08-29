import React, { Component } from 'react'
import { AsyncStorage, Text } from 'react-native'
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
        let { task, navigation, changeTaskName, changeTaskDescription, changeTaskDueDate, saveTask, t } = this.props
        let { id, name, description, dueDate } = task
        return (
            <Container>
                <Content>
                    <Header title={t('labels.editTask')} onLeftButtonPress={() => navigation.goBack()}/>
                    <Form>
                        <Text>{dueDate}</Text>
                        <Item floatingLabel>
                            <Label>{t('labels.task')}</Label>
                            <Input onChangeText={changeTaskName} value={name} onSubmitEditing={this.saveTask}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>{t('labels.description')}</Label>
                            <Input onChangeText={changeTaskDescription} value={description}
                                style={{ height: 200 }} multiline={true} numberOfLines={5}/>
                        </Item>
                        <Item>
                            <DueDatePicker onChangeDate={this.handleChangeDate}/>
                        </Item>
                    </Form>
                </Content>
            </Container>
        )
    }

    saveTask = () => {
        const { task, saveTask } = this.props
        saveTask(task)
    }

    handleChangeDate = dueDate => {
        const { task, changeTaskDueDate, saveTask } = this.props
        changeTaskDueDate(dueDate)
        saveTask(task)
    }
}

function sleep(seconds) {
    var e = new Date().getTime() + (seconds * 1000)
    while (new Date().getTime() <= e) {
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
        sleep(5)
        const accountId = await AsyncStorage.getItem('accountId')
        const { id, name, description, dueDate } = task
        console.log('GOVNO', dueDate, typeof dueDate)
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('X-Account-Id', accountId).send({ name, description, dueDate })
        dispatch(updateTaskAction(body))
    },
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(TaskScreen))
