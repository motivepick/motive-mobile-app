import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon, Text } from 'native-base'
import { iOSColors, iOSUIKit, systemWeights } from 'react-native-typography'
import ProgressCircle from 'react-native-progress-circle'

export default class SectionHeader extends Component {
    render() {
        const { onBodyClick, goal, progress, progressBgColor, progressIcon, text, subText } = this.props
        return (
            <View style={styles.goalCircle}>
                <TouchableOpacity onPress={() => onBodyClick(goal)} style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ProgressCircle
                        percent={progress}
                        radius={30}
                        borderWidth={5}
                        shadowColor={iOSColors.midGray}
                        bgColor={progressBgColor}
                        color={iOSColors.gray}
                    >
                        {Boolean(!progressIcon) && <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.white }]}>{`${progress}%`}</Text>}
                        {Boolean(progressIcon) && <Icon name={progressIcon} style={[systemWeights.bold, {
                            color: iOSColors.gray,
                            fontSize: 40
                        }]}/>}
                    </ProgressCircle>
                    <Text style={[iOSUIKit.footnoteEmphasized]}>{text}</Text>
                    {Boolean(subText) && <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>{subText}</Text>}
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    goalCircle: {
        marginHorizontal: 16,
        padding: 12,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: iOSColors.white,
        borderRadius: 6
    }
})
