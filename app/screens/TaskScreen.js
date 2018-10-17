import React, { Component } from 'react'
import { AsyncStorage, TouchableOpacity, View } from 'react-native'
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
import ColorIndicator from '../components/common/ColorIndicator/ColorIndicator'

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



                        <Form>




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

                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down-outline" />}
                                placeholder="Select your SIM"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                style={{ width: undefined }}
                                selectedValue={this.state.selected}
                                onValueChange={this.onValueChange.bind(this)}
                                headerStyle={{ backgroundColor: iOSColors.white }}
                                headerBackButtonTextStyle={{ color: iOSColors.pink }}
                                itemTextStyle={{ color: '#788ad2' }}
                                // itemStyle={{
                                //     backgroundColor: "#d3d3d3",
                                //     marginLeft: 0,
                                //     paddingLeft: 10
                                // }}
                            >
                                <Picker.Item label={<View style={{flexDirection: 'row', alignItems: 'center'}}><ColorIndicator color={'red'} styler={{marginRight: 10}}/><Text>Veve</Text></View>} value="key0" />
                                <Picker.Item label="Goal 1" value="key1" />
                                <Picker.Item label="Goal 2" value="key2" />
                                <Picker.Item label="Goal 3" value="key3" />
                                <Picker.Item label="Goal 4" value="key4" />
                            </Picker>

                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', width: '100%', marginHorizontal: 16}}>
                                <View style={styles.rowBottom}>
                                    <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>NOTES</Text>
                                </View>
                                <TouchableOpacity style={styles.goalNotes} onPress={this.goToEditDescriptionScreen}>
                                    <Text style={iOSUIKit.footnoteEmphasized}>Some text here and there to support idea of whatever ...</Text>
                                </TouchableOpacity>
                            </View>
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
