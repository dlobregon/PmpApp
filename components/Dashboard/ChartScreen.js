import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet, 
    ActivityIndicator,
    ScrollView, 
    SafeAreaView
} from "react-native";
import {
    VictoryBar,
    VictoryChart
  } from "victory-native";
  import { VictoryTheme } from "victory-core";


const makeActual =(actual_planificado, actual_real)=>{
    let valorActual=[
        {tipo:"Real", valor:actual_real, label:actual_real, fill:"blue"},
        {tipo:"Planificado", valor:actual_planificado, label:actual_planificado,  fill:"orange"}
    ];
    return valorActual;
}
  
class ChartScreen extends Component {
    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }
    componentDidMount(){
        return fetch('http://192.168.1.14:3000/dashboard-indicadores/')
          .then((response) => response.json())
          .then((responseJson) => {
    
            this.setState({
              isLoading: false,
              //dataSource: responseJson.movies,
              total_planificado:responseJson.total_planificado,
              actual_planificado:responseJson.actual_planificado,
              actual_real: responseJson.actual_real,
              valorActual: makeActual(responseJson.actual_planificado, responseJson.actual_real),
              valorTotal:makeActual(responseJson.total_planificado, responseJson.actual_real)
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
            <SafeAreaView style={{flex:1}}>
                <ScrollView scrollEventThrottle={16}>
                    <View style={{borderBottomColor:"gray", borderBottomWidth:0.5}}>
                        <Text>Ejecutado a la fecha</Text>
                        <VictoryChart  theme={VictoryTheme.material} domainPadding={80} >
                            <VictoryBar
                                style={{ data: {  fill: (d) => d.tipo === "Real" ? "#66bb6a" : "#03a9f4", opacity: 1 } }}
                                data={this.state.valorActual}
                                alignment="middle"
                                x="tipo" y="valor"
                                barWidth={60}
                                animate={{ duration: 1000,onLoad: { duration: 500 }}}
                            />
                        </VictoryChart>
                    </View>     
                    <View>
                        <Text>Ejecutado total</Text>
                        <VictoryChart  theme={VictoryTheme.material} domainPadding={80} >
                            <VictoryBar
                                style={{ data: {  fill: (d) => d.tipo === "Real" ? "#66bb6a" : "#03a9f4", opacity: 1 } }}
                                data={this.state.valorTotal}
                                alignment="middle"
                                x="tipo" y="valor"
                                barWidth={60}
                                animate={{ duration: 1000,onLoad: { duration: 500 }}}
                            />
                        </VictoryChart>
                    </View>       
                </ScrollView>
            </SafeAreaView>
                
        );
    }
}
export default ChartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});