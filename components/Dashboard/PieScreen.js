import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet, 
    ActivityIndicator,
    Dimensions, 
    ScrollView
} from "react-native";
import Svg from "react-native-svg";
import {
    VictoryPie,
    VictoryChart,
    VictoryLegend,
} from "victory-native";
import {Card, Divider, Icon, ListItem} from "react-native-elements"
import {ApiUrl, getHeaders} from "../../constants"

const {height, width} = Dimensions.get("window");

class PieScreen extends Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    componentDidMount(){
        getHeaders()
        .then((myConfig)=>{
          fetch(ApiUrl+'/dashboard/getProgramaData/1', myConfig)
          .then((response) => response.json())
          .then((responseJson) => {
            let no_iniciadas = Number(responseJson.resumenTareas.noIniciadas)
            let atrasadas = Number(responseJson.resumenTareas.atrasadas)
            let iniciadas =Number(responseJson.resumenTareas.iniciadas)
            let completadas= Number(responseJson.resumenTareas.completadas);
            let total = no_iniciadas+atrasadas+iniciadas+completadas

            this.setState({
              isLoading: false,
              noIniciadas:responseJson.resumenTareas.noIniciadas,
              atrasadas:responseJson.resumenTareas.atrasadas,
              iniciadas: responseJson.resumenTareas.iniciadas,
              completadas: responseJson.resumenTareas.completadas, 
              pieData:[
                { x: ((no_iniciadas/total*100)).toFixed(2)+"%", y: responseJson.resumenTareas.noIniciadas },
                { x: ((completadas/total)*100).toFixed(2)+"%", y: responseJson.resumenTareas.completadas},
                { x: ((atrasadas/total)*100).toFixed(2)+"%", y: responseJson.resumenTareas.atrasadas },
                { x: ((iniciadas/total)*100).toFixed(2)+"%", y: responseJson.resumenTareas.iniciadas },
              ], 
              labelData:[
                {name:"No iniciadas: "+responseJson.resumenTareas.noIniciadas+" - "+((no_iniciadas/total*100)).toFixed(2)+"%", symbol:{type:"circle", fill:"tomato"}},
                {name:"Completadas: "+responseJson.resumenTareas.completadas+" - "+((completadas/total)*100).toFixed(2)+"%", symbol:{type:"circle", fill:"orange"}},
                {name:"Atrasadas: "+responseJson.resumenTareas.atrasadas+" - "+((atrasadas/total)*100).toFixed(2)+"%" , symbol:{type:"circle", fill:"navy"}},
                {name:"Iniciadas: "+responseJson.resumenTareas.iniciadas+ " - "+((iniciadas/total)*100).toFixed(2)+"%", symbol:{type:"circle", fill:"gold"}},
              ]
            }, function(){
    
            });
    
          })
          .catch((error) =>{
            console.error(error);
          });
        });
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
            <ScrollView style={styles.container}>
              <Card>
                <View style={styles.chartContainer}>
                    <VictoryPie 
                          height={320} width={320}
                          innerRadius={60}
                          labelRadius={120}
                          style={{ labels: { fontSize: 13 } }}
                          colorScale={["tomato", "orange", "gold", "navy" ]}
                          data={this.state.pieData}
                          animate={{ duration: 1500 }}
                      />
                </View>
                <Divider />    
                <ListItem
                  key={1}
                  title={this.state.labelData[0].name}
                  leftIcon={{ name: "vinyl", type:"entypo", color:"tomato" }}
                />
                <Divider />
                <ListItem
                  key={2}
                  title={this.state.labelData[1].name}
                  leftIcon={{ name: "vinyl", type:"entypo", color:"orange" }}
                />
                <Divider />
                <ListItem
                  key={3}
                  title={this.state.labelData[2].name}
                  leftIcon={{ name: "vinyl", type:"entypo", color:"gold" }}
                />
                <Divider />
                <ListItem
                  key={4}
                  title={this.state.labelData[3].name}
                  leftIcon={{ name: "vinyl", type:"entypo", color:"navy" }}
                />
              </Card>
            </ScrollView>
        );
    }
}
export default PieScreen;

const styles = StyleSheet.create({
    container: {
        /*flex: 1,*/
        /*alignItems: 'center',*/
        /*justifyContent: 'center'*/
    }, 
    chartContainer:{
      alignItems:"center", 
      marginTop:-25
    },

});