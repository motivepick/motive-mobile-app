import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        height: 50,
        flex: 1,
        marginTop: 7,
        borderRadius: 4
    },
    text: {
        fontSize: 14
    },
    goal: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        justifyContent: 'center'
    }
})

export default styles
