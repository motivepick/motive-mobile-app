import React from 'react'
import thunkMiddleware from 'redux-thunk'
import { StackNavigator } from 'react-navigation'
import LoginScreen from './screens/LoginScreen'
import SplashScreen from './screens/SplashScreen'
import HomeScreen from './screens/HomeScreen'
import NewGoalScreen from './screens/NewGoalScreen'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import { applyMiddleware, createStore } from 'redux'
import TaskScreen from './screens/TaskScreen'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

const RootStack = StackNavigator({
    Splash: SplashScreen,
    Login: LoginScreen,
    Home: HomeScreen,
    NewGoal: NewGoalScreen,
    Task: TaskScreen
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

const App = () => <Provider store={store}><I18nextProvider i18n={i18n}><RootStack/></I18nextProvider></Provider>

export default App
