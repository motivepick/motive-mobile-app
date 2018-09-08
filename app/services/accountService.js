import { AsyncStorage } from 'react-native'

export const fetchToken = () => AsyncStorage.getItem('token')
