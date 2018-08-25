import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        height: 50,
        flex: 1,
        marginTop: 7,
        borderRadius: 4
    },
    text: {
        fontSize: 14
    },
    textMuted: {
        color: '#bbb',
        fontSize: 11
    },
    strikeText: {
        color: '#bbb',
        textDecorationLine: 'line-through'
    },
    unstrikeText: {
        color: '#29323c'
    },
    task: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center'
    }
})

export default styles
