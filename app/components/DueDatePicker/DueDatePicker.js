import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Icon } from 'native-base'

import moment from 'moment'
import { translate } from 'react-i18next'

const window = Dimensions.get('window')

export class DueDatePicker extends Component {

    constructor(props) {
        super(props)

        this.state = {
            date: ''
        }
    }

    render() {
        const dateFormat = 'YYYY-MM-DD'
        const today = moment().format(dateFormat)
        const { t } = this.props

        return (
            <DatePicker
                customStyles={{
                    dateInput: { borderWidth: 0, alignItems: 'flex-start', justifyContent: 'center', flex: 1 },
                    dateTouchBody: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-start' }
                }}
                style={{ width: window.width }}
                date={this.state.date}
                mode='date'
                placeholder={t('placeholders.whenIsItDue')}
                format={dateFormat}
                minDate={today}
                confirmBtnText={t('labels.set')}
                cancelBtnText={t('labels.cancel')}
                iconComponent={<Icon type='MaterialCommunityIcons' name='calendar-blank'/>}
                onDateChange={(date) => {
                    this.setState({ date: date })
                }}
            />
        )
    }
}

export default translate('translations')(DueDatePicker)