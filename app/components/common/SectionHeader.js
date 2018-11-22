import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'native-base'
import { human, iOSColors, iOSUIKit, systemWeights } from 'react-native-typography'

export default class SectionHeader extends Component {
    render() {
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{this.props.leftText}</Text>
                <TouchableOpacity onPress={this.props.rightAction}>
                    <Text style={styles.sectionRightText}>{this.props.rightActionText}</Text>
                </TouchableOpacity>
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
    sectionTitle: {
        ...human.title2Object,
        ...systemWeights.bold
    },
    sectionRightText: {
        ...iOSUIKit.bodyEmphasizedObject,
        color: iOSColors.pink
    }
})
