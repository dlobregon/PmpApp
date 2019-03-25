import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
} from "react-native";
import {
    VictoryPie,
    VictoryChart
} from "victory-native";
import { VictoryTheme } from "victory-core";

class PieScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>PieScreen</Text>
                <VictoryPie
                    innerRadius={75}
                    labelRadius={125}
                    style={{ labels: { fontSize: 20 } }}
                    data={[
                        { x: "Cats", y: 35 },
                        { x: "Dogs", y: 40 },
                        { x: "Birds", y: 55 }
                      ]}
                    animate={{ duration: 1500 }}
                />
            </View>
        );
    }
}
export default PieScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});