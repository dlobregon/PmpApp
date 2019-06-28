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
import SettingItem from "../components/Settings/SettingItem"

const {height, width} = Dimensions.get("window");



class Settings extends Component {
    static navigationOptions = {
        header: null,
      };
    componentWillMount(){
        // this.startHeaderHeight = 80
        // if(Platform.OS=== "android"){
        //     this.startHeaderHeight = 100 + StatusBar.currentHeight
        // }
    }
    clickNavigationButton=(screen)=>{
        this.props.navigation.navigate(screen)
    }    

    render() {
        return (
            <SafeAreaView>
                <ScrollView scrollEventThrottle={16}>
                    <StatusBar barStyle={"light-content"} />
                    <View style={{flex:1, backgroundColor:"white", paddingTop:20, marginTop:25}}>
                        <View style={{/*height:height-50, marginTop: 20*/}}>
                            <ScrollView >
                               <View> 
                                   <SettingItem /> 
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});