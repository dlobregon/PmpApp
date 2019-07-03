import React, { Component } from "react";
import { 
    View,
    StyleSheet,
    SafeAreaView, 
    Platform, 
    StatusBar, 
    ScrollView,
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
    clickNavigationButton=(screen)=>{
        this.props.navigation.navigate(screen)
    }    

    render() {
        return (
            <SafeAreaView>
                <ScrollView scrollEventThrottle={16}>
                    <StatusBar barStyle={"light-content"} />
                    <View style={{flex:1, height:'100%',backgroundColor:"white", paddingTop:20, marginTop:25}}>
                        <View style={{/*height:height-50, marginTop: 20*/}}>
                            <ScrollView >
                               <View> 
                                   <DashboadItem
                                    imageUri={require("../assets/Indicadores.png")}
                                    name= "Indicadores"
                                    screen="BarScreen"
                                    clickNavigationButton= {this.clickNavigationButton}                                    
                                    icon="barschart"
                                    /> 
                                </View>
                                <View>
                                    <DashboadItem 
                                    imageUri={require("../assets/Tareas.png")}
                                    name= "Tareas"
                                    screen="PieScreen"
                                    icon="piechart"
                                    clickNavigationButton= {this.clickNavigationButton}
                                    /> 
                                </View>
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