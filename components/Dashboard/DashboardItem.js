import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet, 
    Image,
    Dimensions
} from "react-native";
import {Card, Button, Icon} from "react-native-elements"
const {height, width} = Dimensions.get("window");
class DashboardItem extends Component {

    

    render() {
        return (
                <Card containerStyle={styles.card}>
                    <View style={{height:150, marginLeft:20,marginTop:25}}>
                        <View style={{flex:2}}>
                            <Image source={this.props.imageUri}
                            style={{flex:1, width:null, height:null, /*alignSelf: "stretch",*/ resizeMode:"cover"}}
                            />    

                        </View>
                        <View>
                            <Icon
                                name={this.props.icon}
                                type='antdesign'
                                color='#517fa4' 
                                size={75}                                                            
                                iconStyle={{ 
                                    position: 'absolute', top: -75, left: 0, 
                                    backgroundColor:"white", opacity:0.85
                                    , borderColor:"black"
                                }}
                            /> 
                        </View>
                                     
                    </View>
                    
                    <View style={{marginTop:15}} >
                        <Button
                            buttonStyle={{
                                borderColor:"green"
                            }}
                            titleStyle={{color:"green", fontSize:20}}
                            iconContainerStyle={{
                                marginTop:5
                            }}
                            icon={{
                                name: "keyboard-arrow-right",
                                size: 15,
                                color: "green"
                            }}
                            iconRight
                            title={this.props.name}
                            type="clear"
                            onPress={()=> this.props.clickNavigationButton(this.props.screen)}
                        />
                    </View>
                </Card>
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
    },
    card:{
        height: height * 0.40,
        marginTop:20
        
    }
});