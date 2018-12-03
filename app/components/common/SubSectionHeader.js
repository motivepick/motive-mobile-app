import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'native-base'
import { human, iOSColors, systemWeights } from 'react-native-typography'

export default class SectionHeader extends PureComponent {
    render() {
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.subSectionTitle}>{this.props.leftText}</Text>
                <Text style={styles.subSectionRightText}>{this.props.rightText}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    sectionHeader: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    subSectionTitle: {
        ...human.title3Object,
        ...systemWeights.bold
    },
    subSectionRightText: {
        ...human.footnoteObject,
        color: iOSColors.gray
    }
})
