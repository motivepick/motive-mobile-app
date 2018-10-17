import React, { Component } from 'react'
import { Alert, AsyncStorage, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { changeGoalColorAction, changeGoalDescriptionAction, changeGoalNameAction, setGoalAction, updateGoalAction } from '../actions/goalsActions'
import { translate } from 'react-i18next'
import { Body, Button, Container, Content, Form, Header, Input, Item, Left, Right, StyleProvider, Text, Title } from 'native-base'
import DueDatePicker from '../components/common/DueDatePicker/DueDatePicker'
import ColorPicker from '../components/common/ColorPicker/ColorPicker'
import { bindActionCreators } from 'redux'
import request from 'superagent'
// import Header from '../components/common/Header/Header'
import { API_URL } from '../const'
import getTheme from '../../native-base-theme/components'
import baseTheme from '../../native-base-theme/variables/platform'
import { human, iOSColors, iOSUIKit, systemWeights } from 'react-native-typography'

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
                <Container style={{ backgroundColor: iOSColors.white }}>
                    <Header transparent>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Text style={{ color: iOSColors.pink }}>Back</Text>
                            </Button>
                        </Left>
                        <Body>
                        <Title>{'Edit goal'}</Title>
                        </Body>
                        <Right>
                        </Right>
                    </Header>

                    <Content>

                        <Form>




                            {/*<Item rounded style={{ backgroundColor: iOSColors.customGray }}>*/}
                                {/*<DatePicker*/}
                                    {/*value={dueDate}*/}
                                    {/*defaultDate={new Date(2018, 4, 4)}*/}
                                    {/*minimumDate={new Date(2018, 1, 1)}*/}
                                    {/*maximumDate={new Date(2018, 12, 31)}*/}
                                    {/*locale={"en"}*/}
                                    {/*timeZoneOffsetInMinutes={undefined}*/}
                                    {/*modalTransparent={false}*/}
                                    {/*animationType={"fade"}*/}
                                    {/*androidMode={"default"}*/}
                                    {/*placeHolderText="Select date"*/}
                                    {/*textStyle={{ color: "green" }}*/}
                                    {/*placeHolderTextStyle={{ color: "#d3d3d3" }}*/}
                                    {/*onChangeDate={dueDate => saveGoal({*/}
                                        {/*id,*/}
                                        {/*dueDate*/}
                                    {/*})}*/}
                                {/*/>*/}
                                {/*<Text>*/}
                                    {/*/!*Date: {this.state.dueDate.toString().substr(4, 12)}*!/*/}
                                {/*</Text>*/}
                            {/*</Item>*/}



                            <Form style={{ marginHorizontal: 16, marginTop: 8 }}>
                                <View style={[ { marginBottom: 4 }]}>
                                    <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>{t('labels.goal').toLocaleUpperCase()}</Text>
                                </View>
                                <Item rounded style={{ backgroundColor: iOSColors.customGray }}>
                                    <Input
                                        onChangeText={changeGoalName}
                                        value={name}
                                        onSubmitEditing={() => saveGoal({ id, name })}
                                        returnKeyType={'done'}
                                        placeholder={t('labels.newGoal')}
                                        />
                                </Item>
                            </Form>
                            <Form style={{ marginHorizontal: 16, marginTop: 8 }}>
                                <View style={[ { marginBottom: 4 }]}>
                                    <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>{'Due date'.toLocaleUpperCase()}</Text>
                                </View>
                                <Item rounded style={{ borderBottomWidth: 0, backgroundColor: iOSColors.customGray }}>
                                    <DueDatePicker value={dueDate} onChangeDate={dueDate => saveGoal({
                                        id,
                                        dueDate
                                    })}/>
                                </Item>
                            </Form>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', width: '100%', marginHorizontal: 16}}>
                                <View style={styles.rowBottom}>
                                    <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>NOTES</Text>
                                </View>
                                <TouchableOpacity style={styles.goalNotes} onPress={this.goToEditDescriptionScreen}>
                                    <Text style={iOSUIKit.footnoteEmphasized}>Some text here and there to support idea of whatever ...</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.rowBottom, { marginHorizontal: 16}]}>
                                <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>COLOR</Text>
                            </View>
                            <ColorPicker value={colorTag} onChangeColor={colorTag => {
                                changeGoalColor(colorTag)
                                saveGoal({
                                    id,
                                    colorTag
                                })
                            }}/>
                        </Form>


                        {/*{tasks &&*/}
                        {/*<TaskList tasks={tasks} onTaskCreated={task => createGoalTask(id, task)} onFilterChanged={filter => updateGoalTasks(filter, id)}*/}
                        {/*onCloseTask={id => closeGoalTask(id)} onDeleteTask={id => deleteGoalTask(id)}/>}*/}
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
