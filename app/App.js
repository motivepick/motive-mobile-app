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

const RootStack = StackNavigator({
    Splash: SplashScreen,
    Login: LoginScreen,
    Home: HomeScreen,
    NewGoal: NewGoalScreen,
    Task: TaskScreen
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

const App = () => <Provider store={store}><RootStack/></Provider>

export default App
