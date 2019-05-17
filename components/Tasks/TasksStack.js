import {createStackNavigator } from 'react-navigation';
import Tasks from "../../screens/Tasks";
import TaskDetails from "./TraskDetails"
const TasksStack = createStackNavigator({
  Tasks:{
    screen:Tasks,
    navigationOptions: ({ navigation }) => ({
      headerMode: null,
      navigationOptions: {
        headerVisible: false,
      }
    }),
  }, 
  TaskDetails:{
    screen:TaskDetails,
    navigationOptions: () => ({
      title: "TaskDetails",
    }),
  },
}
);
/*const TasksStack =createStackNavigator({
  Tasks: Tasks,
  TaskDetails: TaskDetails
},
{
  initialRouteName: "Tasks"
});*/
export default TasksStack
;
