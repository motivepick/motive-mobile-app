import React, { Component } from 'react'

import { Button, Icon, Item } from 'native-base'

const palette = {
    red: '#C25B56',
    orange: '#FFAE5D',
    blue: '#96C0CE',
    deepBlue: '#336699',
    purple: '#6F3662'
}

class ColorPicker extends Component {

    state = {
        selectedColor: ''
    }

    render() {
        return (
            <Item>
                <Icon name='ios-color-fill'/>
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

export default ColorPicker
