// @flow

import React, { NativeModules } from 'react-native'

export const locale = () => {
    const { SettingsManager, I18nManager } = NativeModules
    return React.Platform.OS === 'ios' ? SettingsManager.settings.AppleLocale : I18nManager.localeIdentifier
}
