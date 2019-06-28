import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import {createSwitchNavigator, createStackNavigator, createAppContainer} from 'react-navigation';

// import the different screens
import Loading from './components/TabNavigator/Loading'
import Login from './components/Login/Login'
import Main from './components/Main/Main'
import MyTabNavigator from './components/TabNavigator/TabNavigatorContainer'


// create our app's navigation stack
const RootStack = createSwitchNavigator(
  {
    Loading,
    Login,
    Main:MyTabNavigator
  },
  {
    initialRouteName: 'Loading'
  }
)

const App = createAppContainer(RootStack);

export default App;