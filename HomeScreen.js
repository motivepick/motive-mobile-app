import React, {Component} from 'react'
import {StyleSheet, Text, View} from "react-native"

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default HomeScreen