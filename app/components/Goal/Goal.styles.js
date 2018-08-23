import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    row: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 16,
        width: 110,
        height: 70,
        marginHorizontal: 4,
        borderRadius: 4
    },
    text: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    goal: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default styles
