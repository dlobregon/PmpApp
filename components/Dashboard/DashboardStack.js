import {createStackNavigator } from 'react-navigation';
import Dashboard from "../../screens/Dashboard";
import BarScreen from "../Dashboard/BarScreen";
import PieScreen from "../Dashboard/PieScreen";

const DashboardStack = createStackNavigator({
    Dashboard:{
      screen:Dashboard,
      navigationOptions: ({ navigation }) => ({
        headerMode: null,
        navigationOptions: {
          headerVisible: false,
        }
      }),
    }, 
    BarScreen:{
      screen:BarScreen,
      navigationOptions: () => ({
        title: "Indicadores",
      }),
    },
    PieScreen:{
      screen:PieScreen,
      navigationOptions: () => ({
        title: "Tareas",
      }),
    },
  });

export default DashboardStack
;
