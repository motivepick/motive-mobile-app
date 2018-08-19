import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,

        borderWidth: 2,
        marginRight: 20
    },
    completeCircle: {
        borderColor: '#bbb'
    },
    incompleteCircle: {
        borderColor: '#DA4453'
    }
})

export default styles
