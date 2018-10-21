import React, { Component } from 'react'
import { AsyncStorage, Dimensions, PixelRatio, Platform, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeTaskDescriptionAction, changeTaskNameAction, setTaskAction } from '../actions/taskActions'
import request from 'superagent'
import { API_URL } from '../const'
import { updateTaskAction } from '../actions/tasksActions'
import { translate } from 'react-i18next'
import { Body, Button, Container, Content, Form, Header, Icon, Input, Item, Left, Picker, Right, StyleProvider, Text, Title } from 'native-base'
import DueDatePicker from '../components/common/DueDatePicker/DueDatePicker'
// import Header from '../components/common/Header/Header'
import { iOSColors, iOSUIKit } from 'react-native-typography'
import { styles } from './GoalScreen'
import getTheme from '../../native-base-theme/components'
import baseTheme from '../../native-base-theme/variables/platform'

const mainTextColor = '#000'
const platform = Platform.OS
const deviceWidth = Dimensions.get('window').width
const variables = {
    // Icon
    textColor: mainTextColor,
    iconFamily: 'Ionicons',
    iconFontSize: platform === 'ios' ? 30 : 28,
    iconHeaderSize: platform === 'ios' ? 33 : 24,
    inputFontSize: 17,
    inputBorderColor: iOSColors.customGray,
    inputSuccessBorderColor: '#2b8339',
    inputErrorBorderColor: '#ed2f2f',
    inputHeightBase: 30,
    get inputColor() {
        return this.textColor
    },
    get inputColorPlaceholder() {
        return '#575757'
    },
    borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1)
}

class TaskScreen extends Component {
    state = {
        selected: undefined
    }
    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        const { navigation, setTask } = this.props
        const task = navigation.getParam('task')
        setTask(task)
    }

    onValueChange(value: string) {
        this.setState({
            selected: value
        });
    }

    render() {
        const { task, navigation, changeTaskName, saveTask, t } = this.props
        const { id, name, description, dueDate } = task
        return (
            <StyleProvider style={getTheme(baseTheme)}>
                <Container style={{ backgroundColor: iOSColors.white }}>
                    <Header transparent>
                        <Left>
                            <Button transparent onPress={() => navigation.goBack()}>
                                <Text style={{ color: iOSColors.pink }}>Back</Text>
                            </Button>
                        </Left>
                        <Body>
                        <Title>{t('labels.editTask')}</Title>
                        </Body>
                        <Right>
                        </Right>
                    </Header>

                    <Content>



                        <Form style={{flex: 1}}>




                            <Form style={{ marginHorizontal: 16, marginTop: 8 }}>
                                <View style={[ { marginBottom: 4 }]}>
                                    <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>{t('labels.task').toLocaleUpperCase()}</Text>
                                </View>
                                <Item rounded style={{ backgroundColor: iOSColors.customGray }}>
                                    <Input style={[{ borderWidth: 0 }]} value={name} onChangeText={changeTaskName} onSubmitEditing={() => saveTask({ id, name })} returnKeyType={'done'}/>
                                </Item>
                            </Form>

                            <Form style={{ marginHorizontal: 16, marginTop: 8 }}>
                                <View style={[ { marginBottom: 4 }]}>
                                    <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>{'Due date'.toLocaleUpperCase()}</Text>
                                </View>
                                <Item rounded style={{ borderBottomWidth: 0, backgroundColor: iOSColors.customGray }}>
                                    <DueDatePicker value={dueDate} onChangeDate={dueDate => saveTask({ id, dueDate })}/>
                                </Item>
                            </Form>

                            <View style={[styles.rowBottom, { marginHorizontal: 16}]}>
                                <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>GOAL</Text>
                            </View>

                            <Item picker style={{ borderBottomWidth: 0, marginHorizontal: 16, backgroundColor: iOSColors.customGray }}>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down-outline" style={{
                                        height: 30,
                                        width: 30,
                                        paddingLeft: 30 / 4,
                                        fontSize: 20,
                                        marginRight: 0
                                    }}/>}
                                    placeholder="Task is part of goal?"
                                    placeholderStyle={{
                                        color: variables.inputColorPlaceholder
                                    }}
                                    placeholderIconColor="#007aff"
                                    style={{
                                        width: deviceWidth - 16 * 2,
                                        paddingHorizontal: 5,
                                        height: variables.inputHeightBase,
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                        paddingTop: 2
                                    }}
                                    selectedValue={this.state.selected}
                                    onValueChange={this.onValueChange.bind(this)}
                                    headerStyle={{ backgroundColor: iOSColors.white }}
                                    headerBackButtonTextStyle={{ color: iOSColors.pink }}
                                    textStyle={{
                                        paddingLeft: 5,
                                        color: variables.inputColor,
                                        fontSize: variables.inputFontSize
                                    }}
                                >
                                    <Picker.Item label="Goal 3" value="key3" />
                                    <Picker.Item label="Task is part of goal" value="key4" />
                                </Picker>
                            </Item>
                            <Form style={{ width: '100%', alignItems: 'stretch', alignContent: 'stretch',  alignSelf: 'stretch' }}>
                                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', marginHorizontal: 16}}>
                                    <View style={styles.rowBottom}>
                                        <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>NOTES</Text>
                                    </View>
                                    <TouchableOpacity style={styles.goalNotes} onPress={this.goToEditDescriptionScreen}>
                                        <Text style={iOSUIKit.footnoteEmphasized}>Some text here and there to support idea of whatever ...</Text>
                                    </TouchableOpacity>
                                </View>
                            </Form>

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
    task: state.task.task
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
