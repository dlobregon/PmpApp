import React, { Component } from "react";
import {ApiUrl} from "../../constants";
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView, 
    Dimensions, 
    Picker,
} from "react-native";
import {
    VictoryBar,
    VictoryChart,
} from "victory-native";
import { VictoryTheme } from "victory-core";
import {Card, ListItem, Divider, ButtonGroup} from "react-native-elements"


const {height, width} = Dimensions.get("window");

const makeActual =(actual_planificado, actual_real)=>{
    let valorActual=[
        {tipo:"Real", valor:actual_real, label:actual_real, fill:"blue"},
        {tipo:"Planificado", valor:Math.floor(actual_planificado), label:Math.floor(actual_planificado),  fill:"orange"}
    ];
    return valorActual;
}
class BarScreen extends Component {
    constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
            seleccion:0, 
            entidades:[{nombre:"Programa Completo"}]
        }
        this.updateIndex=this.updateIndex.bind(this)
    }
    cambioSeleccion(valor){
        this.setState({
            seleccion:valor
        })
    }
    updateIndex (selectedIndex) {
        this.setState({seleccion:selectedIndex})
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
           <View>
               <Card >
                    <View>
                        <View>
                            <Text>Ejecutado a la fecha</Text>
                            <Text style={{fontWeight:"100"}}>
                                {
                                    this.state.seleccion===0? 
                                    isNaN(this.state.actual_real/this.state.actual_planificado)?0:((this.state.actual_real/this.state.actual_planificado)*100).toFixed(2)
                                    :
                                    isNaN(this.state.actual_real/this.state.total_planificado)?0:((this.state.actual_real/this.state.total_planificado)*100).toFixed(2)
                                }
                                %
                            </Text>
                        </View>
                        <View style={styles.barContainer}>
                            <VictoryChart  theme={VictoryTheme.material} domainPadding={80} >
                                <VictoryBar
                                    style={{ data: {  fill: (d) => d.tipo === "Real" ? "#66bb6a" : "#03a9f4", opacity: 1 } }}
                                    data={this.state.seleccion===0?this.state.valorActual:this.state.valorTotal}
                                    alignment="middle"
                                    x="tipo" y="valor"
                                    barWidth={60}
                                    //animate={{ duration: 1000,onLoad: { duration: 500 }}}
                                />
                            </VictoryChart>
                        </View>
                        
                        <Divider />
                        <View>
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
                        <Divider />
                        <View>
                            <ButtonGroup
                                onPress={this.updateIndex}
                                selectedIndex={this.state.seleccion}
                                buttons={["Planeado a la fecha", "Planeado Total"]}                            
                            />
                        </View>
                    </View>  
               </Card>
           </View>
                
        );
    }
}
export default BarScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    barContainer:{
        alignItems:"center", 
        marginTop:-25, 
        marginLeft:10
    }
});