import React, { Component } from 'react'
import { Icon, Picker } from 'native-base'
import { iOSColors } from 'react-native-typography'

class SortPicker extends Component {

    render() {
        const { selectedValue, onValueChange } = this.props

        return (
            <Picker
                mode="dropdown"
                iosIcon={<Icon active name='ios-arrow-down' style={{
                    marginLeft: -10,
                    fontSize: 15,
                    color: iOSColors.pink
                }}/>}
                placeholder="Sort by"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                style={{ marginLeft: -15, width: undefined }}
                selectedValue={selectedValue}
                onValueChange={onValueChange}
                headerStyle={{ backgroundColor: iOSColors.white }}
                headerBackButtonTextStyle={{ color: iOSColors.pink }}
                textStyle={{ color: iOSColors.pink }}
                iosHeader={'Sort by'}
            >
                <Picker.Item label="Recent" value="Recent" />
                <Picker.Item label="Overdue" value="Overdue" />
                <Picker.Item label="By tasks" value="Tasks" />
                <Picker.Item label="By color" value="Color" />
            </Picker>
        )
    }
}


export default SortPicker
