import React, { Component } from 'react'
import { AsyncStorage, ImageBackground, Platform, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import { LoginManager } from 'react-native-fbsdk'
import { navigateWithReset } from './navigationWithReset'
import TaskList from '../components/TaskList/TaskList'
import { Button, Container, Content, Header, Icon, Right, StyleProvider, Text } from 'native-base'
import { translate } from 'react-i18next'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import request from 'superagent'
import { API_URL } from '../const'
import {
    closeTaskAction,
    createTask,
    deleteTaskAction,
    hideClosedTasksAction,
    setFilterAction,
    showClosedTasksAction,
    undoCloseTaskAction,
    updateClosedUserTasksAction,
    updateUserTasksAction
} from '../actions/tasksActions'
import { doDeleteTask, fetchClosedTasks, fetchTasks } from '../services/taskService'
import moment from 'moment'
import { createNewGoalAction, deleteGoalAction, updateUserGoalsAction } from '../actions/goalsActions'
import { doDeleteGoal } from '../services/goalService'
import getTheme from '../../native-base-theme/components'
import baseTheme from '../../native-base-theme/variables/platform'
import { withNavigation } from 'react-navigation'
import { human, iOSColors, iOSUIKit, systemWeights } from 'react-native-typography'
import ProgressCircle from 'react-native-progress-circle'
import { palette } from '../components/common/ColorIndicator/ColorIndicator'

const TouchableRoundedImage = ({ style, ...props }) => (
    <TouchableOpacity style={style}>
        <ImageBackground
            borderRadius={6}
            style={styles.touchableRoundedImage}
            {...props}
        />
    </TouchableOpacity>
);

const headerStyles = StyleSheet.create({
    whiteHeader: {
        height: 30,
        backgroundColor: iOSColors.white,
        borderBottomWidth: 0,
        elevation: 0
    },
    backTouchable: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingHorizontal: 8
    },
    backIcon: {
        color: iOSColors.pink,
        paddingBottom: 2 // Icon visual alignment
    },
    backText: {
        ...iOSUIKit.bodyObject,
        color: iOSColors.pink,
        marginLeft: 8
    }
});
export class HomeScreen extends Component {
    static navigationOptions = {
        header: null
    }
    logout = async () => {
        LoginManager.logOut()
        await AsyncStorage.removeItem('accountId')
        navigateWithReset(this.props.navigation, 'Login')
    }

    componentDidMount() {
        const { updateUserTasks, updateUserGoals } = this.props
        updateUserTasks(false, 'all')
        updateUserGoals()
    }

    render() {
        const {
            tasks,
            closedTasks,
            closedTasksAreShown,
            goals,
            updateUserTasks,
            createTask,
            closeTask,
            deleteTask,
            undoCloseTask,
            createGoal,
            deleteGoal,
            t
        } = this.props

        const goal = goals && goals[0]
        const goal2 = goals && goals[1]
        const goal3 = goals && goals[2]

        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container style={{ backgroundColor: iOSColors.white }}>
                    <Header transparent>
                        <Right>
                            <Button transparent onPress={this.handleGoalClick}>
                                <Icon name='settings' />
                            </Button>
                        </Right>
                    </Header>

                    <StatusBar barStyle="dark-content" />
                    <View style={styles.header}>
                        <View>
                            <Text style={iOSUIKit.largeTitleEmphasized}>Hi, John</Text>
                        </View>
                    </View>
                    <Content>




                        <View style={styles.recentlyPlayed}>
                            <View style={styles.recentlyPlayedTitleBar}>
                                <Text style={styles.recentlyPlayedTitle}>Goals</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGoalsScreen')}>
                                    <Text style={styles.seeAll}>See All</Text>
                                </TouchableOpacity>
                            </View>

                            {/*<GoalList goals={goals && goals.splice(0, 2)} onGoalCreated={goal => createGoal(goal)} onDeleteGoal={id => deleteGoal(id)}/>*/}

                            <ScrollView horizontal contentContainerStyle={styles.recentlyPlayedSongList}>
                                <View style={styles.card3}>
                                    <View style={styles.row}>
                                        <View style={{
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <ProgressCircle
                                                percent={0}
                                                radius={30}
                                                borderWidth={5}
                                                shadowColor={iOSColors.midGray}
                                                bgColor={iOSColors.white}
                                                color={iOSColors.gray}
                                            >
                                                {/*<Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.white }]}>{'Add a goal'}</Text>*/}
                                                <Icon name='add' style={[systemWeights.bold, { color: iOSColors.gray, fontSize: 40 }]}></Icon>
                                            </ProgressCircle>
                                            <Text
                                                style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>{'Add a goal'}</Text>
                                        </View>
                                    </View>
                                </View>
                                {goal && <View style={styles.card3}>
                                    <View style={styles.row}>
                                        <View style={{
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <ProgressCircle
                                                percent={30}
                                                radius={30}
                                                borderWidth={5}
                                                shadowColor={iOSColors.midGray}
                                                bgColor={goal.colorTag && palette[goal.colorTag] ? palette[goal.colorTag] : iOSColors.green}
                                                color={iOSColors.gray}
                                            >
                                                <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.white }]}>{'30%'}</Text>
                                            </ProgressCircle>
                                            <Text
                                                style={[iOSUIKit.footnoteEmphasized, { color: goal.colorTag && palette[goal.colorTag] ? palette[goal.colorTag] : iOSColors.green }]}>{goal.name}</Text>
                                            <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>{'5 tasks'}</Text>
                                        </View>
                                    </View>
                                </View>}
                                {goal2 && <View style={styles.card3}>
                                    <View style={styles.row}>
                                        <View style={{
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <ProgressCircle
                                                percent={10}
                                                radius={30}
                                                borderWidth={5}
                                                shadowColor={iOSColors.midGray}
                                                bgColor={goal2.colorTag && palette[goal2.colorTag] ? palette[goal2.colorTag] : iOSColors.green}
                                                color={iOSColors.gray}
                                            >
                                                <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.white }]}>{'10%'}</Text>
                                            </ProgressCircle>
                                            <Text
                                                style={[iOSUIKit.footnoteEmphasized, { color: goal2.colorTag && palette[goal2.colorTag] ? palette[goal2.colorTag] : iOSColors.green }]}>{goal2.name}</Text>
                                            <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>{'19 tasks'}</Text>
                                        </View>
                                    </View>
                                </View>}
                                {goal3 && <View style={styles.card3}>
                                    <View style={styles.row}>
                                        <View style={{
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <ProgressCircle
                                                percent={0}
                                                radius={30}
                                                borderWidth={5}
                                                shadowColor={iOSColors.midGray}
                                                bgColor={goal3.colorTag && palette[goal3.colorTag] ? palette[goal3.colorTag] : iOSColors.green}
                                                color={iOSColors.gray}
                                            >
                                                <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.white }]}>{'0%'}</Text>
                                            </ProgressCircle>
                                            <Text
                                                style={[iOSUIKit.footnoteEmphasized, { color: goal3.colorTag && palette[goal3.colorTag] ? palette[goal3.colorTag] : iOSColors.green }]}>{goal3.name}</Text>
                                            <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>{'No tasks'}</Text>
                                        </View>
                                    </View>
                                </View>}

                            </ScrollView>
                            <View style={styles.recentlyPlayedTitleBar}>
                                <Text style={styles.recentlyPlayedTitle}>Tasks</Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('AllTasksScreen')}>
                                    <Text style={styles.seeAll}>See All</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.recentlyPlayedTitleBar, styles.recentlyPlayedSong]}>
                                <Text style={styles.recentlyPlayedSUBTitle}>Today</Text>
                                <Text style={styles.author}>{'10 tasks'}</Text>
                            </View>
                            <TaskList
                                tasks={tasks && tasks.splice(0, 2)}
                                onTaskCreated={task => createTask(task)}
                                onFilterChanged={filter => updateUserTasks(false, filter)}
                                onCloseTask={id => closeTask(id)}
                                onDeleteTask={id => deleteTask(id)}
                            />
                            <View style={styles.recentlyPlayedSongList}>
                                <Text style={styles.recentlyPlayedSUBTitle}>Tommorrow</Text>
                                <Text style={styles.album}>{'Some text title'}</Text>
                                <Text style={styles.author}>{'Some text sub title'}</Text>
                                <Text style={styles.recentlyPlayedSUBTitle}>Wednesday</Text>

                            </View>
                            <TaskList
                                tasks={tasks && tasks.splice(3, 5)}
                                onTaskCreated={task => createTask(task)}
                                onFilterChanged={filter => updateUserTasks(false, filter)}
                                onCloseTask={id => closeTask(id)}
                                onDeleteTask={id => deleteTask(id)}
                            />
                            <View style={styles.recentlyPlayedTitleBar}>
                                <Text style={styles.recentlyPlayedSUBTitle}>Upcoming</Text>
                                <Text style={styles.author}>{'Next up: in 15 days'}</Text>
                            </View>
                            <TaskList
                                tasks={tasks && tasks.splice(0, 3)}
                                onTaskCreated={task => createTask(task)}
                                onFilterChanged={filter => updateUserTasks(false, filter)}
                                onCloseTask={id => closeTask(id)}
                                onDeleteTask={id => deleteTask(id)}
                            />
                        </View>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}

const mapStateToProps = state => ({
    tasks: state.tasks.tasks,
    closedTasks: state.tasks.closedTasks,
    closedTasksAreShown: state.tasks.closedTasksAreShown,
    goals: state.goals.goals
})

const mapDispatchToProps = dispatch => bindActionCreators({

    updateUserTasks: (closed, filter) => async (dispatch, getState) => {
        if (closed) {
            const { closedTasksAreShown } = getState().tasks
            if (closedTasksAreShown) {
                dispatch(hideClosedTasksAction())
            } else {
                dispatch(updateClosedUserTasksAction(await fetchClosedTasks()))
                dispatch(showClosedTasksAction())
            }
        } else {
            dispatch(setFilterAction(filter))
            dispatch(updateUserTasksAction(await fetchTasks(filter)))
        }
    },

    createTask: task => async (dispatch, getState) => {
        const { tasks } = getState()
        const { tasksFilter } = tasks
        const token = await AsyncStorage.getItem('token')
        if (tasksFilter === 'today') {
            const { body } = await request.post(`${API_URL}/tasks`).set('Cookie', token).send({ ...task, dueDate: moment().endOf('day') })
            dispatch(createTask(body))
        } else if (tasksFilter === 'thisWeek') {
            const { body } = await request.post(`${API_URL}/tasks`).set('Cookie', token).send({ ...task, dueDate: moment().endOf('week') })
            dispatch(createTask(body))
        } else {
            const { body } = await request.post(`${API_URL}/tasks`).set('Cookie', token).send(task)
            dispatch(createTask(body))
        }
    },

    undoCloseTask: id => async dispatch => {
        const token = await AsyncStorage.getItem('token')
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send({ closed: false })
        dispatch(undoCloseTaskAction(body.id))
    },

    closeTask: id => async dispatch => {
        const token = await AsyncStorage.getItem('token')
        const { body } = await request.put(`${API_URL}/tasks/${id}`).set('Cookie', token).send({ closed: true })
        dispatch(closeTaskAction(body.id))
    },

    deleteTask: id => async dispatch => {
        await doDeleteTask(id)
        dispatch(deleteTaskAction(id))
    },

    deleteGoal: id => async dispatch => {
        await doDeleteGoal(id)
        dispatch(deleteGoalAction(id))
    },

    updateUserGoals: () => async dispatch => {
        const token = await AsyncStorage.getItem('token')
        const { body } = await request.get(`${API_URL}/goals`).set('Cookie', token)
        dispatch(updateUserGoalsAction(body))
    },

    createGoal: goal => async dispatch => {
        const token = await AsyncStorage.getItem('token')
        const { body } = await request.post(`${API_URL}/goals`).set('Cookie', token).send(goal)
        dispatch(createNewGoalAction(body))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(HomeScreen))

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: iOSColors.white
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginHorizontal: 16,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderColor: iOSColors.customGray
    },
    date: {
        ...iOSUIKit.footnoteEmphasizedObject,
        color: iOSColors.gray
    },
    avatar: {
        height: 43,
        width: 43,
        borderRadius: 43 / 2
    },
    body: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch"
    },
    card: {
        marginTop: 24,
        marginHorizontal: 16,
        padding: 12,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: iOSColors.white,
        borderRadius: 6,
        ...Platform.select({
            android: { elevation: 16 },
            ios: {
                shadowColor: "black",
                shadowOffset: {
                    width: 0,
                    height: 16
                },
                shadowOpacity: 0.2,
                shadowRadius: 16
            }
        })
    },
    card2: {
        // marginTop: 24,
        marginHorizontal: 16,
        padding: 12,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: iOSColors.white,
        borderRadius: 6,
        ...Platform.select({
            android: { elevation: 16 },
            ios: {
                shadowColor: "black",
                shadowOffset: {
                    width: 0,
                    height: 16
                },
                shadowOpacity: 0.2,
                shadowRadius: 16
            }
        })
    },
    card3: {
        // marginTop: 24,
        marginHorizontal: 16,
        padding: 12,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        backgroundColor: iOSColors.white,
        borderRadius: 6
    },
    suggestionRow: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "stretch"
    },
    suggestionRowBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
        marginTop: 4
    },
    bigSuggestion: {
        flex: 2,
        aspectRatio: 1
    },
    bigSuggestionWithText: {
        flex: 2,
        aspectRatio: 1,
        justifyContent: "space-between"
    },
    suggestionText: {
        ...human.headlineWhiteObject,
        ...systemWeights.light,
        margin: 8
    },
    bold: {
        ...systemWeights.bold
    },
    updatedFriday: {
        ...human.caption2Object,
        color: "rgba(255,255,255,0.80)",
        margin: 8
    },
    suggestionColumn: {
        flex: 1,
        marginHorizontal: 4,
        aspectRatio: 0.5,
        flexDirection: "column",
        justifyContent: "flex-start"
    },
    smallSuggestion: {
        flex: 1,
        aspectRatio: 1
    },
    smallSuggestionMarginTop: {
        marginTop: 4
    },
    smallSuggestionMarginLeft: {
        marginLeft: 4
    },
    recentlyPlayedTitle: {
        ...human.title2Object,
        ...systemWeights.bold
    },
    recentlyPlayedSUBTitle: {
        ...human.title3Object,
        ...systemWeights.bold
    },
    recentlyPlayed: {
        marginTop: 25,
        paddingTop: 16,
        backgroundColor: iOSColors.white
    },
    recentlyPlayedTitleBar: {
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    seeAll: {
        ...iOSUIKit.bodyEmphasizedObject,
        color: iOSColors.pink
    },
    recentlyPlayedSongList: {
        marginTop: 12,
        paddingHorizontal: 16,
        paddingBottom: 12
    },
    recentlyPlayedSong: {
        marginRight: 8
    },
    recentlyPlayedSongCover: {
        height: 160,
        width: 160,
        borderRadius: 6
    },
    album: {
        ...human.footnoteObject,
        marginTop: 5
    },
    author: {
        ...human.footnoteObject,
        color: iOSColors.gray
    },
    touchableRoundedImage: {
        flex: 1,
        height: undefined,
        width: undefined,
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start"
    }
});

