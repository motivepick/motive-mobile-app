import { StyleSheet } from 'react-native'
import * as colors from '../../../screens/COLORS'

export const styles = StyleSheet.create({
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
    },
    completeCircle: {
        borderColor: '#bbb'
    },
    incompleteCircle: {
        borderColor: colors.accent1Clr
    }
})

export default styles
