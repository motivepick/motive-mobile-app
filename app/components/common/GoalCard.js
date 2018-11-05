import React, { Component } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { Form, Icon, Item, Label, Text } from 'native-base'
import { iOSColors, iOSUIKit } from 'react-native-typography'
import ProgressCircle from 'react-native-progress-circle'
import { palette } from './Palette'
import Description from './Description/Description'
import { translate } from 'react-i18next'
import { getDateAsStr, getDateColor } from '../../utils/dateUtils'
import { calculateGoalProgressStats } from '../../utils/progressUtils'

const Column = ({ ...props }) => (
    <View style={styles.columnCentered}>
        <Text style={[iOSUIKit.largeTitleEmphasized, { color: iOSColors.gray }]}>{props.value}</Text>
        <Text style={styles.cardText}>{props.text}</Text>
    </View>
)

class GoalCard extends Component {

    render() {
        const { data: { dueDate, closed, description, colorTag, tasks = [] }, onGoToEditDescriptionScreen, t } = this.props

        const { percents: { progress }, counts: { incompleteTasksCount, completeTasksCount } } = calculateGoalProgressStats(tasks, closed)

        const progressCircleBgColor = colorTag && palette[colorTag] ? palette[colorTag] : iOSColors.white
        const progressCircleColor = progressCircleBgColor ? iOSColors.white : iOSColors.gray

        const formattedDueDate = getDateAsStr(dueDate)
        const dateColor = formattedDueDate ? getDateColor(dueDate, closed) : iOSColors.midGray

        return (
            <View style={styles.card}>
                <View style={[styles.row, { padding: 16 }]}>
                    <Column value={incompleteTasksCount} text={t('labels.tasksInProgress')}/>
                    <ProgressCircle
                        percent={progress}
                        radius={40}
                        borderWidth={5}
                        shadowColor={iOSColors.midGray}
                        bgColor={progressCircleBgColor}
                        color={iOSColors.gray}
                    >
                        {!closed && <Text style={[iOSUIKit.subheadEmphasized, { color: iOSColors.gray }]}>{`${progress}%`}</Text>}
                        {closed && <Icon name='md-star' style={{ lineHeight: 48, fontSize: 48, color: progressCircleColor }}/>}
                    </ProgressCircle>
                    <Column value={completeTasksCount} text={t('labels.tasksCompleted')}/>
                </View>
                <View style={[styles.row, { marginBottom: 4 }]}>
                    <Text style={[iOSUIKit.footnoteEmphasized, { color: iOSColors.gray }]}>{t('labels.dueDate').toLocaleUpperCase()}</Text>
                    <Text style={[iOSUIKit.footnoteEmphasized, { color: dateColor }]}>{formattedDueDate || t('labels.dueDateNotSet').toLocaleUpperCase()}</Text>
                </View>

                <Form style={{ width: '100%' }}>
                    <Item roundedInputWithLabel>
                        <Label>{t('labels.description').toLocaleUpperCase()}</Label>
                        <Description onGoToEditDescriptionScreen={onGoToEditDescriptionScreen} value={description}/>
                    </Item>
                </Form>
            </View>
        )
    }
}

export default translate('translations')(GoalCard)

export const styles = StyleSheet.create({
    card: {
        marginTop: 24,
        marginHorizontal: 16,
        padding: 12,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: iOSColors.white,
        borderRadius: 6,
        ...Platform.select({
            android: { elevation: 16 },
            ios: {
                shadowColor: 'black',
                shadowOffset: {
                    width: 0,
                    height: 16
                },
                shadowOpacity: 0.2,
                shadowRadius: 16
            }
        })
    },
    cardText: {
        ...iOSUIKit.footnoteObject,
        color: iOSColors.gray,
        textAlign: 'center'
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    columnCentered: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
})
