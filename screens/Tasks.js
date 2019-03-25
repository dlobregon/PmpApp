import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";

class Tasks extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Tasks</Text>
            </View>
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