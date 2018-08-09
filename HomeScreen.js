import React, {Component} from 'react'
import {Text, View} from 'react-native'
import {styles} from './styles'

class HomeScreen extends Component {

    render() {
        const {navigation} = this.props
        const user = navigation.getParam('user')
        return (
            <View style={styles.container}>
                <Text>Tasks for {user.id} will be here</Text>
            </View>
        );
    }
}

export default HomeScreen