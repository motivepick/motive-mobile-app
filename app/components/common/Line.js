import React from 'react'
import { StyleSheet, View } from 'react-native'
import { iOSColors } from 'react-native-typography'

export const Line = () => <View style={styles.line}/>

export default Line

const styles = StyleSheet.create({
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginHorizontal: 16,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderColor: iOSColors.customGray
    }
})
