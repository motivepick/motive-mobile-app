import React, { PureComponent } from 'react'
import { View } from 'react-native'
import { Button, Icon } from 'native-base'
import { translate } from 'react-i18next'

const palette = {
    maroon: '#800000',
    red: '#e6194B',
    pink: '#fabebe',
    brown: '#9A6324',
    orange: '#f58231',
    olive: '#808000',
    yellow: '#ffe119',
    lime: '#bfef45',
    green: '#3cb44b',
    cyan: '#42d4f4',
    deepBlue: '#336699',
    blue: '#4363d8',
    purple: '#911eb4',
    lavender: '#e6beff',
    magenta: '#f032e6'
}

class ColorPicker extends PureComponent {

    constructor(props) {
        super(props)
        const { value } = props
        this.state = ({ selectedColor: value || '' })
    }

    displayButton = color =>
        <Button key={color} value={color} transparent onPress={() => this.onColorSelect(color)}>
            <Icon type='MaterialCommunityIcons' name={this.state.selectedColor === color ? 'check-circle' : 'circle'} style={{ color: palette[color] }}/>
        </Button>

    render() {
        const colors = Object.keys(palette)

        return (
            <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', alignContent: 'flex-start' }}>
                    {colors.slice(0,5).map(this.displayButton)}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', alignContent: 'flex-start' }}>
                    {colors.slice(5,10).map(this.displayButton)}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', alignContent: 'flex-start' }}>
                    {colors.slice(10,15).map(this.displayButton)}
                </View>
            </View>

        )
    }

    onColorSelect = color => {
        const selectedColor = this.state.selectedColor === color ? '' : color
        this.setState({ selectedColor })
        const { onChangeColor } = this.props
        onChangeColor(selectedColor)
    }
}

// TODO: if translations are removed (or if wait is set fo false), constructor is called earlier and the initial state is not set
export default translate('translations')(ColorPicker)
