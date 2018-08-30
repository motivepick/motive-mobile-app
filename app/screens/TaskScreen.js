import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeTaskDescriptionAction, changeTaskNameAction, setTaskAction } from '../actions/taskActions'
import request from 'superagent'
import { API_URL } from '../const'
import { updateTaskAction } from '../actions/tasksActions'
import { translate } from 'react-i18next'
import { Container, Content, Form, Input, Item, Label } from 'native-base'
import DueDatePicker from '../components/common/DueDatePicker/DueDatePicker'
import Header from '../components/common/Header/Header'

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
        const { task, navigation, changeTaskName, changeTaskDescription, saveTask, t } = this.props
        const { id, name, description, dueDate } = task
        return (
            <Container>
                <Content>
                    <Header title={t('labels.editTask')} onLeftButtonPress={() => navigation.goBack()}/>
                    <Form>
                        <Item floatingLabel>
                            <Label>{t('labels.task')}</Label>
                            <Input value={name} onChangeText={changeTaskName} onSubmitEditing={() => saveTask({ id, name })} returnKeyType={'done'}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>{t('labels.description')}</Label>
                            <Input onChangeText={changeTaskDescription} value={description}
                                style={{ height: 200 }} multiline={true} numberOfLines={5}/>
                        </Item>
                        <Item>
                            <DueDatePicker value={dueDate} onChangeDate={dueDate => saveTask({ id, dueDate })}/>
                        </Item>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => ({
    task: state.task.task
})

const mapDispatchToProps = dispatch => bindActionCreators({

    setTask: task => dispatch => dispatch(setTaskAction(task)),

    changeTaskName: taskName => dispatch => dispatch(changeTaskNameAction(taskName)),

    changeTaskDescription: taskDescription => dispatch => dispatch(changeTaskDescriptionAction(taskDescription)),

    saveTask: task => async dispatch => {
        const accountId = await AsyncStorage.getItem('accountId')
        const { id, name, description, dueDate } = task
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('X-Account-Id', accountId).send({ name, description, dueDate })
        dispatch(updateTaskAction(body))
    },
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(TaskScreen))
