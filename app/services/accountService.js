import { AsyncStorage } from 'react-native'

export const fetchAccountId = () => AsyncStorage.getItem('accountId')
