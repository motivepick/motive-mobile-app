import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeTaskDescriptionAction, changeTaskNameAction, setTaskAction } from '../actions/taskActions'
import request from 'superagent'
import { API_URL } from '../const'
import { updateTaskAction } from '../actions/tasksActions'
import { translate } from 'react-i18next'
import { Container, Content, Form, Input, Item, Label, StyleProvider } from 'native-base'
import DueDatePicker from '../components/common/DueDatePicker/DueDatePicker'
import Header from '../components/common/Header/Header'
import getTheme from '../../native-base-theme/components'
import baseTheme from '../../native-base-theme/variables/platform'
import Description from '../components/common/Description/Description'
import GoalPicker from '../components/common/GoalPicker/GoalPicker'

class TaskScreen extends Component {

    static navigationOptions = {
        header: null
    }

    state = {
        selected: this.props.task.goal && this.props.task.goal.id
    }

    componentDidMount() {
        const { navigation, setTask } = this.props
        const task = navigation.getParam('task')
        setTask(task)
    }

    onValueChange(value: string) {
        this.setState({
            selected: value
        })
    }

    render() {
        const { task, navigation, changeTaskName, saveTask, goals = [], t } = this.props
        const { id, name, description, dueDate } = task

        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container>
                    <Header
                        title={t('headings.editTask')}
                        leftButtonLabel={t('labels.back')} onLeftButtonPress={() => navigation.goBack()}
                    />
                    <Content>
                        <Form style={{ marginHorizontal: 16 }}>
                            <Item roundedInputWithLabel>
                                <Label>{t('labels.task').toLocaleUpperCase()}</Label>
                                <Input value={name} onChangeText={changeTaskName} onSubmitEditing={() => saveTask({ id, name })} returnKeyType={'done'}/>
                            </Item>
                            <Item roundedInputWithLabel>
                                <Label>{t('labels.dueDate').toLocaleUpperCase()}</Label>
                                <DueDatePicker value={dueDate} onChangeDate={dueDate => saveTask({ id, dueDate })}/>
                            </Item>
                            {goals.length && <Item roundedInputWithLabel>
                                <Label>{t('labels.goal').toLocaleUpperCase()}</Label>
                                <GoalPicker selectedValue={this.state.selected} onValueChange={this.onValueChange.bind(this)} placeholder={'Task is part of goal?'} data={goals}/>
                            </Item>}
                            <Item roundedInputWithLabel>
                                <Label>{t('labels.description').toLocaleUpperCase()}</Label>
                                <Description onGoToEditDescriptionScreen={this.handleDescriptionClick} value={description}/>
                            </Item>
                        </Form>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }

    handleDescriptionClick = () => {
        const { task, navigation } = this.props
        navigation.navigate('DescriptionEditScreen', { task })
    }
}

const mapStateToProps = state => ({
    task: state.task.task,
    goals: state.goals.goals
})

const mapDispatchToProps = dispatch => bindActionCreators({

    setTask: task => dispatch => dispatch(setTaskAction(task)),

    changeTaskName: taskName => dispatch => dispatch(changeTaskNameAction(taskName)),

    changeTaskDescription: taskDescription => dispatch => dispatch(changeTaskDescriptionAction(taskDescription)),

    saveTask: task => async dispatch => {
        const token = await AsyncStorage.getItem('token')
        const { id, name, description, dueDate } = task
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send({ name, description, dueDate })
        dispatch(updateTaskAction(body))
    },
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(TaskScreen))
