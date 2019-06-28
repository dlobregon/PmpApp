import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
//importing the icons 
import Icon from 'react-native-vector-icons/Ionicons'
/*import {  VictoryBar} from "victory-native";*/
//importing screens
import DashboardStack from "../Dashboard/DashboardStack";
import TasksStack from "../Tasks/TasksStack";


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


const MyAppNavigator = createStackNavigator({
  Home: TabNavigator,
},
{
  headerMode: 'none',
  header:null
});

MyTabNavigator = createAppContainer(MyAppNavigator)
 

export default MyTabNavigator;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
