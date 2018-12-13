import React, { PureComponent } from 'react'
import { Input } from 'native-base'
import { ios } from '../../utils/platform'

/**
 * There is a bug in React Native related to single line input in iOS. The workaround is to use multi line input. But multi line inputs do not
 * work well for Android. As a solution, multi line input is used for iOS and single line input is used for Android.
 */
export class UniversalInput extends PureComponent {

    render() {
        return ios() ? this.renderMultiLineInput() : this.renderSingleLineInput()
    }

    renderMultiLineInput = () =>
        <Input style={{ paddingTop: 4, paddingBottom: 6 }} blurOnSubmit={true} enablesReturnKeyAutomatically={true}
            multiline={true} numberOfLines={1} onKeyPress={this.onKeyPress} {...this.props}/>

    renderSingleLineInput = () => <Input style={{ flex: 1, alignSelf: 'stretch' }} {...this.props}/>

    onKeyPress = (event) => {
        const { nativeEvent } = event
        const { onSubmitEditing } = this.props
        if (nativeEvent.key === 'Enter') {
            onSubmitEditing()
        }
    }
}
