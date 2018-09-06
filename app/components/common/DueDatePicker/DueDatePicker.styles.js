import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dateInput: {
        borderWidth: 0,
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 42
    },
    dateTouchBody: {
        flexDirection: 'row-reverse',
        height: 42
    },
    datePickerContainer: {
        flex: 4
    },
    clearBtn: {
        flex: 1,
        height: 42
    },
    clearBtnIcon: {
        height: 31
    }
})

export default styles
