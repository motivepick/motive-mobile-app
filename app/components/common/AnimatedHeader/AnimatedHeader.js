import React, { PureComponent } from 'react'
import { Body, Button, Header, Left, Right, Text, Title } from 'native-base'
import { StyleSheet, View } from 'react-native'
import { iOSUIKit } from 'react-native-typography'
import { ios } from '../../../utils/platform'

const HEADER_EXPANDED_LINE_HEIGHT = 32.5

export const ExpandedHeader = ({ style, ...props }) => (
    <View style={styles.headerExpandedContainer}>
        <Text style={[styles.headerExpanded]}>{props.title}</Text>
    </View>
)

// If AnimatedHeader is used add onScroll event to ScrollView (a.k.a <Content> from NativeBase)
class AnimatedHeaderComponent extends PureComponent {
    state = {
        showMiniHeader: false
    }

    componentDidMount() {
        this.props.scrollOffset.addListener(this.scrollListener.bind(this))
    }

    scrollListener (e) {
        if (e.value >= HEADER_EXPANDED_LINE_HEIGHT && this.state.showMiniHeader === false) {
            this.setState({ showMiniHeader: true })
        } else if (e.value <= HEADER_EXPANDED_LINE_HEIGHT && this.state.showMiniHeader === true) {
            this.setState({ showMiniHeader: false })
        }
    }

    render() {
        const { title, rightButtonLabel, leftButtonLabel, onLeftButtonPress, onRightButtonPress, leftIcon, rightIcon } = this.props
        return (
            <Header transparent={ios()}>
                <Left>
                    {
                        Boolean(onLeftButtonPress) &&
                        <Button transparent onPress={onLeftButtonPress}>
                            {leftButtonLabel && <Text>{leftButtonLabel}</Text>}
                            {leftIcon}
                        </Button>
                    }
                </Left>
                {
                    Boolean(title) && this.state.showMiniHeader &&
                    <Body>
                        <Title>
                            {title}
                        </Title>
                    </Body>
                }
                <Right>
                    {
                        Boolean(onRightButtonPress) &&
                        <Button transparent onPress={onRightButtonPress}>
                            {rightButtonLabel && <Text>{rightButtonLabel}</Text>}
                            {rightIcon}
                        </Button>
                    }
                </Right>
            </Header>
        )
    }
}

export default AnimatedHeaderComponent

const styles = StyleSheet.create({
    headerExpandedContainer: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerExpanded: {
        ...iOSUIKit.largeTitleEmphasizedObject
    }
})
