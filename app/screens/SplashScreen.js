import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { navigateWithReset } from './navigationWithReset'
import CookieManager from 'react-native-cookies'
import { fetchToken } from '../services/accountService'

class SplashScreen extends PureComponent {

    componentDidMount() {
        // we have to remove cookies before first request, otherwise it may add multiple SESSION values
        // see https://build.affinity.co/persisting-sessions-with-react-native-4c46af3bfd83 for details
        CookieManager.clearAll().then(() => fetchToken().then(token => navigateWithReset(this.props.navigation, token ? 'MainNavigation' : 'Login')))
    }

    render() {
        return <View/>
    }
}

export default SplashScreen
