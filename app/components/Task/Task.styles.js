import { Platform, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        height: 80,
        flex: 1,
        marginTop: 7,
        borderRadius: 4,

        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0,0.2)',
                shadowOpacity: 1,
                shadowOffset: { height: 2, width: 2 },
                shadowRadius: 2
            },

            android: {
                elevation: 0,
                marginHorizontal: 30
            }
        })
    },
    text: {
        fontSize: 24,
        color: '#222222'
    },
    textMuted: {
        // color: '#778899',
        color: '#bbb',
        fontSize: 12
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
