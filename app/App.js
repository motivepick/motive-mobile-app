import React from 'react'
import thunkMiddleware from 'redux-thunk'
import { createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import LoginScreen from './screens/LoginScreen'
import SplashScreen from './screens/SplashScreen'
import HomeScreen from './screens/HomeScreen'
import GoalEditScreen from './screens/GoalEditScreen'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import { applyMiddleware, createStore } from 'redux'
import TaskEditScreen from './screens/TaskEdit'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import GoalScreen from './screens/Goal'
import TaskDescriptionEditScreen from './screens/DescriptionEdit/TaskDescriptionEdit'
import GoalDescriptionEditScreen from './screens/DescriptionEdit/GoalDescriptionEdit'
import AllTasksScreen from './screens/AllTasks'
import AllGoalsScreen from './screens/AllGoals'
import AccountScreen from './screens/AccountScreen'
import FooterComponent from './components/common/Footer'

const RootStack = createStackNavigator(
    {
        Splash: SplashScreen,
        Login: LoginScreen,
        Home: HomeScreen,
        AllTasksScreen,
        AllGoalsScreen,
        TaskEditScreen,
        Goal: GoalScreen,
        GoalEdit: GoalEditScreen,
        TaskDescriptionEditScreen,
        GoalDescriptionEditScreen,
        MainNavigation: createBottomTabNavigator(
            {
                AllTasksScreen: {
                    screen: AllTasksScreen
                },
                Home: {
                    screen: HomeScreen
                },
                AccountScreen: {
                    screen: AccountScreen
                }
            },
            {
                tabBarPosition: 'bottom',
                tabBarComponent: FooterComponent,
                lazy: true
            }
        )
    },
    {
        header: null,
        headerMode: 'none',
        navigationOptions: {
            header: null
        }
    }
)

const AppNav = createAppContainer(RootStack)

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

const App = () => <Provider store={store}><I18nextProvider i18n={i18n}><AppNav/></I18nextProvider></Provider>

export default App
