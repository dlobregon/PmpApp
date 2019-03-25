import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import {
    VictoryBar,
  } from "victory-native";

class ChartScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Some random Chart</Text>
                <VictoryBar
            style={{ data: { fill: "tomato", opacity: 0.5 } }}
            data={[
              { x: 15, y: 20, label: 1, fill: "red" },
              { x: 25, y: 30, label: 2, fill: "orange" },
              { x: 35, y: 65, label: 3, fill: "gold" },
              { x: 40, y: 50, label: 4, fill: "blue" },
              { x: 45, y: 40, label: 5, fill: "cyan" },
              { x: 50, y: 30, label: 6, fill: "green" }
            ]}
          />
            </View>
        );
    }
}
export default ChartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});