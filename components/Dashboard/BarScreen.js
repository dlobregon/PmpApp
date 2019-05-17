import React, { Component } from "react";
import {ApiUrl} from "../../constants";
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView, 
    SafeAreaView, 
    Picker,
} from "react-native";
import {
    VictoryBar,
    VictoryChart,
} from "victory-native";
import { VictoryTheme } from "victory-core";
import SwitchSelector from "react-native-switch-selector";


const makeActual =(actual_planificado, actual_real)=>{
    let valorActual=[
        {tipo:"Real", valor:actual_real, label:actual_real, fill:"blue"},
        {tipo:"Planificado", valor:Math.floor(actual_planificado), label:Math.floor(actual_planificado),  fill:"orange"}
    ];
    return valorActual;
}
const options = [
    { label: "Planeado a la fecha", value: 1 },
    { label: "Pleneado total", value: 2 }
  ];

class BarScreen extends Component {
    constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
            seleccion:1, 
            entidades:[{nombre:"Programa Completo"}]
        }
    }
    cambioSeleccion(valor){
        this.setState({
            seleccion:valor
        })
    }
    componentDidMount(){
        fetch(ApiUrl+'/dashboard-indicadores/')
          .then((response) => response.json())
          .then((responseJson) => {
    
            this.setState({
              isLoading: false,
              //dataSource: responseJson.movies,
              total_planificado:responseJson.total_planificado,
              actual_planificado:responseJson.actual_planificado,
              actual_real: responseJson.actual_real,
              valorActual: makeActual(responseJson.actual_planificado, responseJson.actual_real),
              valorTotal:makeActual(responseJson.total_planificado, responseJson.actual_real), 
            }, function(){
    
            });
    
          })
          .catch((error) =>{
            console.error(error);
          });
        fetch(ApiUrl+'/dashboard/getSociosTareas/1')
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
              isLoading: false,
              //dataSource: responseJson.movies,
              entidades:responseJson.sociosTareas
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
                    <View style={{marginTop:25}}>
                        <SwitchSelector
                        options={options}
                        initial={0}
                        onPress={value => this.cambioSeleccion(value)}
                        textColor={"grey"} //'#7a44cf'
                        selectedColor={"white"}
                        buttonColor={"grey"}
                        borderColor={"grey"}
                        hasPadding
                        />
                    </View> 
                    <View > 
                        <Picker
                        selectedValue={this.state.language}
                        style={{height: 50, width: 100}}
                       
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({language: itemValue})
                        }>
                            
                            {this.state.entidades.map((entidad)=>{
                                return (<Picker.Item label={entidad.nombre} value={entidad.nombre} key={this.state.entidades.indexOf(entidad)}/>)
                            }

                            )}
                        </Picker>
                    </View>                   
                    <View>
                        <View>
                            <Text>Ejecutado a la fecha</Text>
                            <Text style={{fontWeight:"100"}}>
                                {
                                    this.state.seleccion===1? 
                                    isNaN(this.state.actual_real/this.state.actual_planificado)?0:((this.state.actual_real/this.state.actual_planificado)*100).toFixed(2)
                                    :
                                    isNaN(this.state.actual_real/this.state.total_planificado)?0:((this.state.actual_real/this.state.total_planificado)*100).toFixed(2)
                                }
                                %
                            </Text>
                        </View>
                        <VictoryChart  theme={VictoryTheme.material} domainPadding={80} >
                            <VictoryBar
                                style={{ data: {  fill: (d) => d.tipo === "Real" ? "#66bb6a" : "#03a9f4", opacity: 1 } }}
                                data={this.state.seleccion===1?this.state.valorActual:this.state.valorTotal}
                                alignment="middle"
                                x="tipo" y="valor"
                                barWidth={60}
                                //animate={{ duration: 1000,onLoad: { duration: 500 }}}
                            />
                        </VictoryChart>
                    </View>    
                </ScrollView>
            </SafeAreaView>
                
        );
    }
}
export default BarScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});