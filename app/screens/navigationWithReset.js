import { NavigationActions, StackActions } from 'react-navigation'

export const navigateWithReset = (navigation, routeName, params) => {
    navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName, params })
        ]
    }))
}
