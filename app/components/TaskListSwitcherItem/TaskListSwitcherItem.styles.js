import { Platform, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    row: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        width: 110,
        height: 150,
        marginHorizontal: 10,
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
        fontSize: 15,
        color: '#222222',
        textAlign: 'center'
    },
    taskListSwitcherItem: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default styles
