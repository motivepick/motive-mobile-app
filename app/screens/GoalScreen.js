import React, { Component } from 'react'
import { Alert, AsyncStorage, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { LoginManager } from 'react-native-fbsdk'
import { navigateWithReset } from './navigationWithReset'
import { Button, Container, Content, Form, Header, Icon, Input, Item, Left, Right, StyleProvider, Text } from 'native-base'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import request from 'superagent'
import { API_URL } from '../const'

import { doDeleteTask, fetchTasks } from '../services/taskService'
import moment from 'moment'
import { closeGoalTaskAction, createGoalTaskAction, deleteGoalTaskAction, setGoalAction, updateGoalTasksAction } from '../actions/goalsActions'
import getTheme from '../../native-base-theme/components'
import baseTheme from '../../native-base-theme/variables/platform'
import { human, iOSColors, iOSUIKit, systemWeights } from 'react-native-typography'
import Overlay from 'react-native-modal-overlay'
import TaskList from '../components/TaskList/TaskList'
import ProgressCircle from 'react-native-progress-circle'
import { palette } from '../components/common/ColorIndicator/ColorIndicator'

export class GoalScreen extends Component {
    static navigationOptions = {
        header: null
    }
    state = {
        modalVisible: false,
        isModalVisible: false,
        currentTab: 0,
        tasksByStatus: 'In progress'
    }
    logout = async () => {
        LoginManager.logOut()
        await AsyncStorage.removeItem('accountId')
        navigateWithReset(this.props.navigation, 'Login')
    }
    toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible })

    toggleSortBy = () => Alert.alert('Show sorting options')

    toggleTasksByStatus = () => this.setState({ tasksByStatus: this.state.tasksByStatus === 'In progress' ? 'Completed' : 'In progress' })

    goToEditDescriptionScreen = () => Alert.alert('Go to EditDescriptionScreen')
    logout = async () => {
        LoginManager.logOut()
        await AsyncStorage.removeItem('accountId')
        navigateWithReset(this.props.navigation, 'Login')
    }
    handleGoalClick = () => {
        const { goal, navigation } = this.props
        navigation.navigate('GoalEdit', { goal })
    }

    showOverlay() {
        this.setState({ modalVisible: true })
    }

    hideOverlay() {
        this.setState({ modalVisible: false })
    }

    componentDidMount() {
        const { navigation, setGoal } = this.props
        const goal = navigation.getParam('goal')
        setGoal(goal)
    }

    render() {
        const { goal, navigation, createGoalTask, updateGoalTasks, closeGoalTask, deleteGoalTask, t } = this.props
        const { id, tasks } = goal

        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container style={{ backgroundColor: iOSColors.white }}>
                    <Header hasTabs transparent>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Text style={{ color: iOSColors.pink }}>Back</Text>
                            </Button>
                        </Left>
                        <Right>
                            <Button transparent onPress={this.handleGoalClick}>
                                <Text style={{ color: iOSColors.pink }}>{t('labels.editGoal')}</Text>
                            </Button>
                        </Right>
                    </Header>

                    <Content>
                    <KeyboardAvoidingView
                        behavior="position"
                        enabled>
                        <View style={styles.header}>
                            <Text style={iOSUIKit.largeTitleEmphasized}>{goal.name}</Text>
                        </View>
                        <View style={[styles.line]}>


                        </View>
                        <View style={styles.card} behavior="padding" enabled>
                            <View style={styles.row}>
                                <View style={{
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <ProgressCircle
                                        percent={30}
                                        radius={40}
                                        borderWidth={5}
                                        shadowColor={iOSColors.midGray}
                                        bgColor={goal.colorTag && palette[goal.colorTag] ? palette[goal.colorTag] : iOSColors.white}
                                        color={iOSColors.gray}
                                    >
                                        <Text style={[iOSUIKit.subheadEmphasized, { color: iOSColors.white }]}>{'30%'}</Text>
                                    </ProgressCircle>
                                    <Text
                                        style={[iOSUIKit.subheadEmphasized, { color: goal.colorTag && palette[goal.colorTag] ? palette[goal.colorTag] : iOSColors.white }]}>{'Completion'}</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                    marginLeft: 10,
                                    marginBottom: 10
                                }}>
                                    <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>DEADLINE: <Text
                                        style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.red }]}>15 October</Text></Text>
                                    <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>Complete to get rewards <Text
                                        style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.blue }]}>SPA visit</Text></Text>
                                    {/*<Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>TASKS LEFT: <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.red }]}>3</Text></Text>*/}
                                </View>

                            </View>
                            <View style={styles.rowBottom}>
                                <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>NOTES:</Text>
                            </View>

                            <TouchableOpacity style={styles.goalNotes} onPress={this.goToEditDescriptionScreen}>
                                <Text style={iOSUIKit.footnoteEmphasized}>Some text here and there to support idea of ...</Text>
                            </TouchableOpacity>
                        </View>
                        </KeyboardAvoidingView>
                        <View style={styles.taskSection}>
                            <View style={styles.taskTitleBar}>
                                <Text style={styles.taskTitle}>Tasks</Text>
                                <TouchableOpacity>
                                    <Text style={styles.taskAction}>Add</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        <Form style={{ marginHorizontal: 16, marginTop: 8 }}>
                            <Item rounded style={{ backgroundColor: iOSColors.customGray }}>
                                <Icon active name='add' />
                                <Input
                                    // onChangeText={taskName => this.setState({ taskName })}
                                    // value={taskName}
                                    // onSubmitEditing={this.onAddNewTask}
                                    returnKeyType={'done'}
                                    placeholder={t('labels.newTask')}/>
                            </Item>
                        </Form>
                        <View style={[styles.line, { marginBottom: 8 }]}></View>
                        <View style={[styles.line, { marginBottom: 8 }]}>
                            <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>130 TASKS</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: 16,
                            marginBottom: 12
                        }}>
                            <TouchableOpacity onPress={this.toggleSortBy} style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Text style={{ color: iOSColors.pink }}>Recent</Text>
                                <Icon active name='ios-arrow-down' style={{
                                    marginLeft: 5,
                                    fontSize: 15,
                                    color: iOSColors.pink
                                }}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.toggleTasksByStatus}>
                                <Text style={[{ color: iOSColors.pink }]}>{'Status: ' + this.state.tasksByStatus}</Text>
                            </TouchableOpacity>
                        </View>

                        {tasks &&
                        <TaskList tasks={tasks} onTaskCreated={task => createGoalTask(id, task)} onFilterChanged={filter => updateGoalTasks(filter, id)}
                                  onCloseTask={id => closeGoalTask(id)} onDeleteTask={id => deleteGoalTask(id)}/>}
                    </Content>
                    <Overlay visible={this.state.isModalVisible} closeOnTouchOutside onClose={this.toggleModal}
                             animationType="slideInDown"
                             easing="ease-in"
                             childrenWrapperStyle={{ backgroundColor: '#eee' }}
                    >
                        <Text>Here a form to add a task will be added</Text>
                    </Overlay>
                </Container>
            </StyleProvider>
        )
    }
}

const mapStateToProps = state => ({
    goal: state.goals.goal
})

const mapDispatchToProps = dispatch => bindActionCreators({

    setGoal: goal => dispatch => dispatch(setGoalAction(goal)),

    createGoalTask: (goalId, task) => async (dispatch, getState) => {
        const { goals } = getState()
        const { filter } = goals
        const token = await AsyncStorage.getItem('token')
        if (filter === 'today') {
            const { body } = await request.post(`${API_URL}/goals/${goalId}/tasks`)
                .set('Cookie', token).send({ ...task, dueDate: moment().endOf('day') })
            dispatch(createGoalTaskAction(body))
        } else if (filter === 'thisWeek') {
            const { body } = await request.post(`${API_URL}/goals/${goalId}/tasks`)
                .set('Cookie', token).send({ ...task, dueDate: moment().endOf('week') })
            dispatch(createGoalTaskAction(body))
        } else {
            const { body } = await request.post(`${API_URL}/goals/${goalId}/tasks`).set('Cookie', token).send(task)
            dispatch(createGoalTaskAction(body))
        }
    },

    updateGoalTasks: (filter, goalId) => async dispatch => {
        dispatch(updateGoalTasksAction(filter, await fetchTasks(filter, goalId)))
    },

    closeGoalTask: id => async dispatch => {
        const token = await AsyncStorage.getItem('token')
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send({ closed: true })
        dispatch(closeGoalTaskAction(body.id))
    },

    deleteGoalTask: id => async dispatch => {
        await doDeleteTask(id)
        dispatch(deleteGoalTaskAction(id))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(GoalScreen))

export const styles = StyleSheet.create({
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginHorizontal: 16,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderColor: iOSColors.customGray
    },
    header: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    card: {
        marginTop: 24,
        marginHorizontal: 16,
        padding: 12,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: iOSColors.white,
        borderRadius: 6,
        ...Platform.select({
            android: { elevation: 16 },
            ios: {
                shadowColor: 'black',
                shadowOffset: {
                    width: 0,
                    height: 16
                },
                shadowOpacity: 0.2,
                shadowRadius: 16
            }
        })
    },
    goalNotes: {
        marginTop: 4,
        padding: 12,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: '#f3ece6',
        borderRadius: 6
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    },
    rowBottom: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        marginTop: 4
    },
    taskTitle: {
        ...human.title2Object,
        ...systemWeights.bold
    },
    taskSection: {
        marginTop: 25,
        paddingTop: 16,
        backgroundColor: iOSColors.white
    },
    taskTitleBar: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    taskAction: {
        ...iOSUIKit.bodyEmphasizedObject,
        color: iOSColors.pink
    }
})
