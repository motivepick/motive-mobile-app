import React, { Component } from 'react'
import { Alert, AsyncStorage, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { changeGoalColorAction, changeGoalDescriptionAction, changeGoalNameAction, setGoalAction, updateGoalAction } from '../actions/goalsActions'
import { translate } from 'react-i18next'
import { Container, Content, Form, Input, Item, StyleProvider, Text } from 'native-base'
import DueDatePicker from '../components/common/DueDatePicker/DueDatePicker'
import ColorPicker from '../components/common/ColorPicker/ColorPicker'
import { bindActionCreators } from 'redux'
import request from 'superagent'

import { API_URL } from '../const'
import getTheme from '../../native-base-theme/components'
import baseTheme from '../../native-base-theme/variables/platform'
import { human, iOSColors, iOSUIKit, systemWeights } from 'react-native-typography'
import Header from '../components/common/Header/Header'
import FormLabel from '../components/common/FormLabel/FormLabel'

class GoalEditScreen extends Component {
    static navigationOptions = {
        header: null
    }
    state = {
        modalVisible: false,
        isModalVisible: false,
        currentTab: 0,
        tasksByStatus: 'In progress'
    }

    toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible })

    toggleSortBy = () => Alert.alert('Show sorting options')

    toggleTasksByStatus = () => this.setState({ tasksByStatus: this.state.tasksByStatus === 'In progress' ? 'Completed' : 'In progress' })

    goToEditDescriptionScreen = () => Alert.alert('Go to EditDescriptionScreen')

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
        const { goal, changeGoalName, changeGoalDescription, changeGoalColor, saveGoal, t } = this.props
        const { id, name, description, dueDate, colorTag } = goal
        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container>
                    <Header
                        title={t('headings.editGoal')}
                        leftButtonLabel={t('labels.back')} onLeftButtonPress={() => this.props.navigation.goBack()}
                    />

                    <Content>
                        <Form style={{ marginHorizontal: 16 }}>
                            <View style={{  marginTop: 8 }}>
                                <FormLabel labelText={t('labels.goal').toLocaleUpperCase()}/>
                                <Item rounded>
                                    <Input
                                        onChangeText={changeGoalName}
                                        value={name}
                                        onSubmitEditing={() => saveGoal({ id, name })}
                                        returnKeyType={'done'}
                                        placeholder={t('labels.newGoal')}
                                        />
                                </Item>
                            </View>
                            <View style={{ marginTop: 8 }}>
                                <FormLabel labelText={'Due date'.toLocaleUpperCase()}/>
                                <Item rounded>
                                    <DueDatePicker value={dueDate} onChangeDate={dueDate => saveGoal({
                                        id,
                                        dueDate
                                    })}/>
                                </Item>
                            </View>

                            <View style={{ marginTop: 8 }}>
                                <FormLabel labelText={'NOTES'.toLocaleUpperCase()}/>
                                <TouchableOpacity style={styles.goalNotes} onPress={this.goToEditDescriptionScreen}>
                                    <Text style={iOSUIKit.footnoteEmphasized}>Some text here and there to support idea of whatever ...</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: 8 }}>
                                <FormLabel labelText={'COLOR'.toLocaleUpperCase()}/>
                                <ColorPicker value={colorTag} onChangeColor={colorTag => {
                                    changeGoalColor(colorTag)
                                    saveGoal({
                                        id,
                                        colorTag
                                    })
                                }}/>
                            </View>
                        </Form>
                    </Content>
                </Container>
            </StyleProvider>
        )
    }
}



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


const mapStateToProps = state => ({
    goal: state.goals.goal
})

const mapDispatchToProps = dispatch => bindActionCreators({

    setGoal: goal => dispatch => dispatch(setGoalAction(goal)),

    changeGoalName: name => dispatch => dispatch(changeGoalNameAction(name)),

    changeGoalDescription: description => dispatch => dispatch(changeGoalDescriptionAction(description)),

    changeGoalColor: color => dispatch => dispatch(changeGoalColorAction(color)),

    saveGoal: goal => async dispatch => {
        const token = await AsyncStorage.getItem('token')
        const { id } = goal
        const { body } = await request.put(`${API_URL}/goals/${id}`).set('Cookie', token).send(goal)
        dispatch(updateGoalAction(body))
    }
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(translate('translations')(GoalEditScreen))
