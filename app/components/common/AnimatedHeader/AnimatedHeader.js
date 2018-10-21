import React, { Component } from 'react'
import { Body, Button, Header, Left, Right, Text, Title } from 'native-base'
import { iOSUIKit } from 'react-native-typography'
import { Animated, StyleSheet, View } from 'react-native'

const HEADER_EXPANDED_HEIGHT = 41.5
const HEADER_COLLAPSED_HEIGHT = 0

// If AnimatedHeader is used add onScroll event to ScrollView (a.k.a <Content> from NativeBase)
class AnimatedHeaderComponent extends Component {
    render() {
        const headerHeight = this.props.scrollOffset.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
            outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
            extrapolate: 'clamp'
        })
        const headerTitleOpacity = this.props.scrollOffset.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })
        const heroTitleOpacity = this.props.scrollOffset.interpolate({
            inputRange: [0, HEADER_EXPANDED_HEIGHT-HEADER_COLLAPSED_HEIGHT],
            outputRange: [1, 0],
            extrapolate: 'clamp'
        })

        const { title, rightButtonLabel, leftButtonLabel, onLeftButtonPress, onRightButtonPress } = this.props
        return (
            <View>
                <Header transparent>
                    <Left>
                        {
                            leftButtonLabel && onLeftButtonPress &&
                            <Button transparent onPress={onLeftButtonPress}>
                                <Text>{leftButtonLabel}</Text>
                            </Button>
                        }
                    </Left>

                    {
                        title &&
                        <Body>
                            <Title>
                                <Animated.Text style={[styles.headerCollapsed, { opacity: headerTitleOpacity }]}>{title}</Animated.Text>
                            </Title>
                        </Body>
                    }
                    <Right>
                        {
                            rightButtonLabel && onRightButtonPress &&
                            <Button transparent onPress={onRightButtonPress}>
                                <Text>{rightButtonLabel}</Text>
                            </Button>
                        }
                    </Right>
                </Header>
                {
                    title &&
                    <Animated.View style={styles.headerExpandedContainer}>
                        <Animated.Text style={[styles.headerExpanded, { opacity: heroTitleOpacity, height: headerHeight }]}>{title}</Animated.Text>
                    </Animated.View>
                }
            </View>
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
    },
    headerCollapsed: {
        textAlign: 'center',
        fontSize: 18,
        marginTop: 28
    }
})
