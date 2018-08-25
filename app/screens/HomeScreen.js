import React, { Component } from 'react'
import { AsyncStorage, View } from 'react-native'
import { LoginManager } from 'react-native-fbsdk'
import { navigateWithReset } from './navigationWithReset'
import TaskList from '../components/TaskList/TaskList'
import GoalList from '../components/GoalList/GoalList'
import { Container, Content } from 'native-base'

export class HomeScreen extends Component {

    static navigationOptions = {
        header: null
    }

    logout = async () => {
        LoginManager.logOut()
        await AsyncStorage.removeItem('accountId')
        navigateWithReset(this.props.navigation, 'Login')
    }

    render() {
        return (
            <Container>
                <Content>
                    <View style={{ flex: 1, flexDirection: 'column', paddingTop: 6, backgroundColor: '#fff' }}>
                        <GoalList/>
                        <TaskList/>
                    </View>
                </Content>
            </Container>
        )
    }
}

export default HomeScreen
