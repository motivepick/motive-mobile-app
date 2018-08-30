import { Dimensions, StyleSheet } from 'react-native'

const window = Dimensions.get('window')

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    list: {
        flex: 1
    },
    contentContainer: {
        width: window.width
    }
})

export default styles