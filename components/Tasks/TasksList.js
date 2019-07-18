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
    ActivityIndicator,

} from "react-native";
import {ListItem} from "react-native-elements"
//recursos para hacer la llamada al api
import {ApiUrl, getHeaders} from "../../constants";
import deviceStorage  from '../Common/MyStorage'

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

const textAdjust =(string)=>{
    let maxlimit=80;
    return  ((string).length > maxlimit) ? (((string).substring(0,maxlimit-3)) + '...') : string
}

class TaskList extends Component {
    static navigationOptions = {
        header: null,
      };
      constructor(props){
          super(props);
          this.state={
              tasks:[], 
              isLoading: true
          }
      }
    componentDidMount(){
        //obtenemos el usuario
        deviceStorage.getItem("user").then(
            (user)=>{
                getHeaders()
                .then((myConfig)=>{
                    fetch(ApiUrl+'/app_api/getTasks',{
                        method:"POST",
                        body:JSON.stringify({
                            "user":user
                        }),
                        headers:myConfig.headers,                         
                    })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        //almacenamos la respuesta en el estado
                        this.setState({tasks:responseJson.tasks, isLoading:false})
                    })
                    .catch((error) =>{
                        console.error(error);
                    });
                });
            }
        );

        
    }
    componentWillMount(){
        this.startHeaderHeight = 80
        if(Platform.OS=== "android"){
            this.startHeaderHeight = 100 + StatusBar.currentHeight
        }
        
    }

    render() {
        
        if(this.state.isLoading){
            return(
              <View style={{flex: 1, padding: 20}}>
                <ActivityIndicator/>
              </View>
            )
        }
        return (
           <SafeAreaView>
                <ScrollView scrollEventThrottle={16}>
                    <View style={{flex:1, backgroundColor:"white"}}>
                        <View style={{/*marginLeft:20,*/ marginTop: 20}}>                            
                            <FlatList 
                                data={this.state.tasks}
                                renderItem={({ item }) => (
                                    <ListItem
                                      title={textAdjust( item.nombre)}
                                      subtitle={`EDT: ${item.edt}`}
                                      titleNumberOfLines={0}
                                      subtitleNumberOfLines={0}
                                      containerStyle={{ borderBottomWidth: 1, borderBottomColor:"#D3D3D3" }}
                                      onPress={()  => this.props.navigation.navigate('TaskDetails', {
                                        item:item
                                      })}
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