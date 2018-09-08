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
import Description from '../components/common/Description/Description'

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
        const { task, navigation, changeTaskName, saveTask, t } = this.props
        const { id, name, description, dueDate } = task
        return (
            <Container>
                <Content>
                    <Header title={t('labels.editTask')} onLeftButtonPress={() => navigation.goBack()}/>
                    <Form style={{ marginRight: 15 }}>
                        <Item floatingLabel>
                            <Label>{t('labels.task')}</Label>
                            <Input value={name} onChangeText={changeTaskName} onSubmitEditing={() => saveTask({ id, name })} returnKeyType={'done'}/>
                        </Item>
                        <Item style={{ borderColor: 'white' }}>
                            <DueDatePicker value={dueDate} onChangeDate={dueDate => saveTask({ id, dueDate })}/>
                        </Item>
                        <Item stackedLabel onPress={this.handleDescriptionClick} >
                            <Label>{t('labels.description')}</Label>
                            <Description value={description}/>
                        </Item>
                    </Form>
                </Content>
            </Container>
        )
    }

    handleDescriptionClick = () => {
        const { task, navigation } = this.props
        navigation.navigate('DescriptionEditScreen', { task })
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
