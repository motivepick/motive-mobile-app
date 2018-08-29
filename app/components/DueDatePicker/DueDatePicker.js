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
        this.state = { dateAsStringInLocalFormat: this.dateAsStringInLocalFormat(value) }
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
                date={this.state.dateAsStringInLocalFormat}
                mode='date'
                placeholder={t('placeholders.whenIsItDue')}
                format={format}
                minDate={today}
                confirmBtnText={t('labels.set')}
                cancelBtnText={t('labels.cancel')}
                iconComponent={<Icon type='MaterialCommunityIcons' name='calendar-blank'/>}
                onDateChange={dateAsStringInLocalFormat => this.handleDateChange(dateAsStringInLocalFormat)}
            />
        )
    }

    dateAsStringInLocalFormat = (isoDate) => isoDate ? moment(isoDate, 'YYYY-MM-DDTHH:mm:ss.SSS').format(this.format()) : ''

    handleDateChange = (dateAsStringInLocalFormat) => {
        const { onChangeDate } = this.props
        const isoDate = moment(dateAsStringInLocalFormat, this.format()).format('YYYY-MM-DDTHH:mm:ss.SSS')
        this.setState({ dateAsStringInLocalFormat: dateAsStringInLocalFormat })
        onChangeDate(isoDate)
    }

    format = () => moment().creationData().locale.longDateFormat('L')
}

export default translate('translations')(DueDatePicker)
