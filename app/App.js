import React from 'react'
import { createStackNavigator } from 'react-navigation'
import LoginScreen from './screens/LoginScreen'
import SplashScreen from './screens/SplashScreen'
import HomeScreen from './screens/HomeScreen'
import NewGoalScreen from './screens/NewGoalScreen'
import { Provider } from 'react-redux'
import promise from 'redux-promise'
import rootReducer from './reducers'
import { applyMiddleware, createStore } from 'redux'

const RootStack = createStackNavigator({
    Splash: SplashScreen,
    Login: LoginScreen,
    Home: HomeScreen,
    NewGoal: NewGoalScreen
})

const enhancer = applyMiddleware(promise)
const store = createStore(rootReducer, enhancer)

const App = () => <Provider store={store}><RootStack/></Provider>

export default App
