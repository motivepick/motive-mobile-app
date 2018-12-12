import React, { PureComponent } from 'react'
import { StyleSheet, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import { getDateAsStr, getDateColor } from '../../../utils/dateUtils'
import { Body, Icon, ListItem, Right, Text } from 'native-base'
import { human, iOSColors } from 'react-native-typography'
import ProgressCircle from 'react-native-progress-circle'
import palette from '../Palette'
import variables from '../../../../native-base-theme/variables/platform'
import { ios } from '../../../utils/platform'

class CheckboxListItem extends PureComponent {

    state = { completed: this.props.isCompleted }

    renderProgressIos = (progress, checkboxBgColor, checked, checkboxMarkColor) => {
        return (
            <TouchableOpacity onPress={this.handleComplete}>
                <ProgressCircle
                    percent={progress}
                    radius={13}
                    borderWidth={3}
                    shadowColor={iOSColors.midGray}
                    bgColor={checkboxBgColor}
                    color={iOSColors.gray}
                >
                    {checked && <Icon type="FontAwesome" name='check' style={{ fontWeight: 'bold', lineHeight: 18, fontSize: 18, color: checkboxMarkColor }}/>}
                </ProgressCircle>
            </TouchableOpacity>
        )
    }

    renderProgressAndroid = (progress, checkboxBgColor, checked, checkboxMarkColor) => {
        return (
            <View style={{ borderRadius: 17, borderWidth: 1, borderColor: 'transparent', width: 34, height: 34, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <TouchableNativeFeedback
                    onPress={this.handleComplete}
                    background={TouchableNativeFeedback.Ripple(variables.androidRippleColorDark)} delayPressIn={0}>
                    <View pointerEvents='box-only'
                        style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center' }}>
                        <ProgressCircle
                            percent={progress}
                            radius={13}
                            borderWidth={3}
                            shadowColor={iOSColors.midGray}
                            bgColor={checkboxBgColor}
                            color={iOSColors.gray}
                        >
                            {checked && <Icon type="FontAwesome" name='check' style={{ fontWeight: 'bold', lineHeight: 18, fontSize: 18, color: checkboxMarkColor }}/>}
                        </ProgressCircle>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }

    render() {
        const { onBodyClick, text, noteText, date, checkboxColor = iOSColors.white, progress = 0 } = this.props
        const { completed } = this.state
        const checked = completed || progress === 100
        const formattedDueDate = getDateAsStr(date)
        const dateColor = getDateColor(date, checked)
        const checkboxBgColor = checkboxColor && palette[checkboxColor] ? palette[checkboxColor] : iOSColors.white
        const checkboxMarkColor = iOSColors.midGray
        return (
            <ListItem noIndent noBorder style={{ backgroundColor: iOSColors.white }} onPress={onBodyClick}>
                {
                    ios() ? this.renderProgressIos(progress, checkboxBgColor, checked, checkboxMarkColor) :
                        this.renderProgressAndroid(progress, checkboxBgColor, checked, checkboxMarkColor)
                }
                <Body style={{ marginLeft: 4 }}>
                    <Text style={checked ? styles.strikeText : {}}>{text}</Text>
                    {formattedDueDate && <Text style={[styles.date, { color: dateColor }]}>{formattedDueDate}</Text>}
                    {noteText && <Text style={styles.note}>{noteText}</Text>}
                </Body>
                <Right style={{ marginRight: 3 }}>
                    <Icon name="ios-arrow-forward"/>
                </Right>
            </ListItem>
        )
    }

    handleComplete = () => {
        const { onComplete } = this.props
        const { completed } = this.state
        this.setState({ completed: !completed })
        onComplete(!completed)
    }
}

export default CheckboxListItem

const styles = StyleSheet.create({
    note: {
        ...human.caption2Object,
        color: iOSColors.gray
    },
    date: {
        ...human.caption2Object,
        color: iOSColors.red
    },
    strikeText: {
        color: iOSColors.gray,
        textDecorationLine: 'line-through'
    }
})
