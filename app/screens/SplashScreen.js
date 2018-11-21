import React, { Component } from 'react'
import { View } from 'react-native'
import request from 'superagent'
import { navigateWithReset } from './navigationWithReset'
import { API_URL } from '../const'
import CookieManager from 'react-native-cookies'
import { fetchToken } from '../services/accountService'

class SplashScreen extends Component {

    async componentDidMount() {
        const token = await fetchToken()

        // we have to remove cookies before first request, otherwise it may add multiple SESSION values
        // see https://build.affinity.co/persisting-sessions-with-react-native-4c46af3bfd83 for details
        CookieManager.clearAll().then(() => {
            request.get(`${API_URL}/users`)
                .set('Cookie', token)
                .then(() => navigateWithReset(this.props.navigation, 'AllTasksScreen'))
                .catch(() => navigateWithReset(this.props.navigation, 'Login'))
        })
    }

    render() {
        return <View/>
    }
}

export default SplashScreen
