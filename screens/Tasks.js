import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import TasksList from "../components/Tasks/TasksList"
import TaskList from "../components/Tasks/TasksList";
class Tasks extends Component {
    static navigationOptions = {
        header: null,
      };
    render() {
        return (
            <TaskList navigation={this.props.navigation}/>
        );
    }
}
export default Tasks;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});