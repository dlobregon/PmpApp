import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet, 
    FlatList,
    ScrollView, 
    StatusBar, 
    SafeAreaView,
    Dimensions,
    Platform, 
    TouchableHighlight,

} from "react-native";
import {ListItem} from "react-native-elements"

const {height, width} = Dimensions.get("window");
const data =[
    {item:"uno", email:"uno---"},
    {item:"dos", email:"dps---"},
    {item:"tres", email:"dps---"},
    {item:"cuatro", email:"dps---"},
    {item:"cinco", email:"dps---"},
    {item:"seis", email:"dps---"},
    {item:"siete", email:"dps---"},
    {item:"ocho", email:"dps---"},
    {item:"nueve", email:"dps---"},
    {item:"diez", email:"dps---"},
]


class TaskList extends Component {
    static navigationOptions = {
        header: null,
      };
      componentWillMount(){
        this.startHeaderHeight = 80
        if(Platform.OS=== "android"){
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
    }
    /*gotToDetails=()=>{
        
        this.props.navigation.navigate('TaskDetails')
    }*/
    render() {
        const { navigate } = this.props.navigation;
        return (
           <SafeAreaView>
                <ScrollView scrollEventThrottle={16}>
                    <View style={{flex:1, backgroundColor:"white"}}>
                        <View style={{/*marginLeft:20,*/ marginTop: 20}}>
                            
                            <FlatList 
                                data={data}
                                /*renderItem={
                                    ({item})=>(<Text style={{height:75}} >{item.item}</Text>)
                                }*/
                                renderItem={({ item }) => (
                                    <ListItem
                                      title={`${item.item} ${item.email}`}
                                      subtitle={item.email}
                                      containerStyle={{ borderBottomWidth: 1, borderBottomColor:"#D3D3D3" }}
                                      onPress={()  => this.props.navigation.navigate('TaskDetails')}
                                    />
                                  )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            
        );
    }
}
export default TaskList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    header_style:{
 
        width: '100%', 
        height: 45, 
        backgroundColor: '#00BCD4', 
        alignItems: 'center', 
        justifyContent: 'center'
       
      }
});