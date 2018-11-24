import { Dimensions, Platform } from 'react-native'

export const ios = () => {
    return Platform.OS === 'ios'
}

export const iphoneX = () => {
    const X_WIDTH = 375
    const X_HEIGHT = 812

    const XSMAX_WIDTH = 414
    const XSMAX_HEIGHT = 896

    const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get('window')

    if (ios() && !Platform.isPad && !Platform.isTVOS) {
        return W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT || W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT
    }

    return false
}

export const android = () => {
    return Platform.OS === 'android'
}
