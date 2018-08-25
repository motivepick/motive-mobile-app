import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Icon } from 'native-base'

const window = Dimensions.get('window')

export class DueDatePicker extends Component {

    constructor(props) {
        super(props)

        this.state = {
            date: ''
        }
    }

    render() {
        return (
            <DatePicker
                customStyles={{
                    dateInput: { borderWidth: 0, alignItems: 'flex-start', justifyContent: 'center', flex: 1 },
                    dateTouchBody: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-start' }
                }}
                style={{ width: window.width }}
                date={this.state.date}
                mode="date"
                placeholder=" "
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate="2019-06-01"
                confirmBtnText="Set"
                cancelBtnText="Cancel"
                iconComponent={<Icon active name='ios-calendar'/>}
                onDateChange={(date) => {
                    this.setState({ date: date })
                }}
            />
        )
    }
}

export default DueDatePicker