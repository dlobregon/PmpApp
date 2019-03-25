import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput, 
    Platform, 
    StatusBar, 
    ScrollView,
    Image, 
    Button,
    Dimensions,
} from "react-native";
import DashboadItem from "../components/Dashboard/DashboardItem"

const {height, width} = Dimensions.get("window");



class Dashboard extends Component {
    static navigationOptions = {
        header: null,
      };
    componentWillMount(){
        this.startHeaderHeight = 80
        if(Platform.OS=== "android"){
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
    }
    
    render() {
        return (
            <SafeAreaView>
                <ScrollView scrollEventThrottle={16}>
                    <View style={{flex:1, backgroundColor:"white", paddingTop:20}}>
                        <View style={{height:height-50, marginTop: 20}}>
                            <ScrollView >
                               <View> 
                                   <DashboadItem 
                                    imageUri={require("../assets/Tareas.png")}
                                    name= "Tareas"
                                    /> 
                                     <Button
                                        style={{height:150, width:200, marginLeft:20, borderWidth:0.5, borderColor:"#dddddd"}}
                                        title="Ver el chart"
                                        onPress={() => this.props.navigation.navigate('ChartScreen')}
                                        />
                                </View>
                                
                                <DashboadItem 
                                    imageUri={require("../assets/Indicadores.png")}
                                    name= "Indicadores"
                                /> 
                                <DashboadItem 
                                    imageUri={require("../assets/Salud.png")}
                                    name= "Salud del proyecto"
                                /> 
                                <DashboadItem 
                                    imageUri={require("../assets/Presupuesto.png")}
                                    name= "Presupuesto"
                                />
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});