import React, { Component } from 'react'
import { View } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Button, Icon } from 'native-base'

import moment from 'moment'
import { translate } from 'react-i18next'

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
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <DatePicker
                    customStyles={{
                        dateInput: { borderWidth: 0, alignItems: 'flex-start', justifyContent: 'center', height: 42 },
                        dateTouchBody: { flexDirection: 'row-reverse', height: 42 }
                    }}
                    style={{ flex: 4 }}
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
                {this.state.dateAsStringInLocalFormat && <Button transparent danger style={{ flex: 1, height:42 }} onPress={() => this.clearDate()}>
                    <Icon type='MaterialCommunityIcons' name='close-circle-outline' style={{ height:31 }}/>
                </Button>}
            </View>
        )
    }

    dateAsStringInLocalFormat = (isoDate) => isoDate ? moment(isoDate, 'YYYY-MM-DDTHH:mm:ss.SSS').format(this.format()) : ''

    handleDateChange = (dateAsStringInLocalFormat) => {
        const { onChangeDate } = this.props
        const isoDate = moment(dateAsStringInLocalFormat, this.format()).format('YYYY-MM-DDTHH:mm:ss.SSS')
        this.setState({ dateAsStringInLocalFormat: dateAsStringInLocalFormat })
        onChangeDate(isoDate)
    }

    clearDate = () => {
        const { onChangeDate } = this.props
        this.setState({ dateAsStringInLocalFormat: '' })
        onChangeDate('')
    }

    format = () => moment().creationData().locale.longDateFormat('L')
}

export default translate('translations')(DueDatePicker)
