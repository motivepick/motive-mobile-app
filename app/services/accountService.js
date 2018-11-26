import { AsyncStorage } from 'react-native'

export const storeToken = (token, callback) => {
    AsyncStorage.setItem('token', 'SESSION=' + token, callback)
}

export const fetchToken = () => AsyncStorage.getItem('token')

export const removeToken = callback => AsyncStorage.removeItem('token', callback)
