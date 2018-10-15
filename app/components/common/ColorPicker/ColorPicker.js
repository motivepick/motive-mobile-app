import React, { Component } from 'react'
import { Button, Icon, Item } from 'native-base'
import { translate } from 'react-i18next'

const palette = {
    red: '#C25B56',
    orange: '#FFAE5D',
    blue: '#96C0CE',
    deepBlue: '#336699',
    purple: '#6F3662'
}

class ColorPicker extends Component {

    constructor(props) {
        super(props)
        const { value } = props
        this.state = ({ selectedColor: value || '' })
    }

    render() {
        return (
            <Item style={{ borderBottomWidth: 0 }}>
                {Object.keys(palette).map(color =>
                    <Button key={color} value={color} transparent onPress={() => this.onColorSelect(color)}>
                        <Icon type='MaterialCommunityIcons' name={this.state.selectedColor === color ? 'check-circle' : 'circle'}
                            style={{ color: palette[color] }}/>
                    </Button>
                )}
            </Item>
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
