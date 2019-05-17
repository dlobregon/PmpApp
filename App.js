import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
//importing the icons 
import Icon from 'react-native-vector-icons/Ionicons'
/*import {  VictoryBar} from "victory-native";*/
//importing screens
import DashboardStack from "./components/Dashboard/DashboardStack";
import TasksStack from "./components/Tasks/TasksStack";

const TabNavigator= createBottomTabNavigator({
  Tasks: TasksStack,
  Dashboard: DashboardStack,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Icon;
      let iconName;
      if (routeName === 'Dashboard') {
        iconName = `ios-stats`;
        // Sometimes we want to add badges to some icons. 
        // You can check the implementation below.
      } else if (routeName === 'Tasks') {
        iconName = `ios-clock`;
      } 

      // You can return any component that you like here!
      return <IconComponent name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
}
);


const AppNavigator = createStackNavigator({
  Home: TabNavigator,
},
{
  headerMode: 'none',
  header:null
});


export default createAppContainer(AppNavigator);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
