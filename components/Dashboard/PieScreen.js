import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet, 
    ActivityIndicator,
    Dimensions
} from "react-native";
import Svg from "react-native-svg";
import {
    VictoryPie,
    VictoryChart,
    VictoryLegend,
} from "victory-native";
import {ApiUrl} from "../../constants"


class PieScreen extends Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    componentDidMount(){
        return fetch(ApiUrl+'/dashboard/getProgramaData/1')
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
                {name:"No iniciadas: "+responseJson.resumenTareas.noIniciadas, symbol:{type:"circle", fill:"tomato"}},
                {name:"Completadas: "+responseJson.resumenTareas.completadas, symbol:{type:"circle", fill:"orange"}},
                {name:"Atrasadas: "+responseJson.resumenTareas.atrasadas, symbol:{type:"circle", fill:"navy"}},
                {name:"Iniciadas: "+responseJson.resumenTareas.iniciadas, symbol:{type:"circle", fill:"gold"}},
              ]
            }, function(){
    
            });
    
          })
          .catch((error) =>{
            console.error(error);
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
            <View style={styles.container}>
                <View  style={{ display: "flex", flexWrap: "wrap", flex:1 }}>
                    <VictoryPie
                        innerRadius={75}
                        labelRadius={145}
                        style={{ labels: { fontSize: 13 } }}
                        colorScale={["tomato", "orange", "gold", "navy" ]}
                        data={this.state.pieData}
                        animate={{ duration: 1500 }}
                    />
                </View>
                <View style={{flex:1, border: { stroke: "black" }, padding:10, height:700}}>
                    <Svg width={Dimensions.get("window").width} height={600}>
                      <VictoryLegend
                        x={5} y={100}
                        data={this.state.labelData  }
                        standalone={false}
                        itemsPerRow={4}
                      />
                    </Svg>
                </View>
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