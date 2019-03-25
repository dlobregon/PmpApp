import React, { Component } from "react";
import {createStackNavigator } from 'react-navigation';
import Dashboard from "../../screens/Dashboard";
import BarScreen from "../Dashboard/BarScreen";
import PieScreen from "../Dashboard/PieScreen"
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
const DashboardStack = createStackNavigator({
    Dashboard:{
      screen:Dashboard,
      navigationOptions: ({ navigation }) => ({
        //headerMode: 'none',
        headerMode: null,
        navigationOptions: {
          headerVisible: false,
        }
      }),
    }, 
    BarScreen:BarScreen,
    PieScreen:PieScreen,
  }
  );

export default DashboardStack
;
