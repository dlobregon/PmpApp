import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class TaskDetails extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>TaskDetails</Text>
            </View>
        );
    }
}
export default TaskDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});