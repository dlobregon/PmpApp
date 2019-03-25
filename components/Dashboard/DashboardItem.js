import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet, 
    Image,
    Button,
} from "react-native";
import ChartScreen from "./ChartScreen"
class DashboardItem
 extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={{height:150, width:200, marginLeft:20, borderWidth:0.5, borderColor:"#dddddd", marginTop:30}}>
                    <View style={{flex:2}}>
                        <Image source={this.props.imageUri}
                         style={{flex:1, width:null, height:null, resizeMode:"cover"}}
                        />
                    </View>
                    <View  style={{flex:1, paddingLeft:10, paddingTop:10}}>
                        <Text>{this.props.name}</Text>
                    </View>
                    
                </View>
            </View>
        );
    }
}
export default DashboardItem
;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});