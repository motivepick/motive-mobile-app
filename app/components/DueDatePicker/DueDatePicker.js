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
        const { value } = props
        this.state = { value: value ? moment(value, moment.ISO_8601).format(this.format()) : '' }
    }

    render() {
        const format = this.format()
        const today = moment().format(format)
        const { t } = this.props

        return (
            <DatePicker
                customStyles={{
                    dateInput: { borderWidth: 0, alignItems: 'flex-start', justifyContent: 'center', flex: 1 },
                    dateTouchBody: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-start' }
                }}
                style={{ width: window.width }}
                date={this.state.value}
                mode='date'
                placeholder={t('placeholders.whenIsItDue')}
                format={format}
                minDate={today}
                confirmBtnText={t('labels.set')}
                cancelBtnText={t('labels.cancel')}
                iconComponent={<Icon type='MaterialCommunityIcons' name='calendar-blank'/>}
                onDateChange={date => this.handleDateChange(moment(date, format))}
            />
        )
    }

    handleDateChange = (date) => {
        const { onChangeDate } = this.props
        this.setState({ value: date })
        onChangeDate(date)
    }

    format = () => moment().creationData().locale.longDateFormat('L')
}

export default translate('translations')(DueDatePicker)
