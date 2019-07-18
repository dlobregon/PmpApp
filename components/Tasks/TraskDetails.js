import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet, 
    Image
} from "react-native";

import { Card, 
    ListItem, 
    Button, 
    Icon , 
    Divider, 
    Slider} from 'react-native-elements'
import {VictoryPie, VictoryLabel} from "victory-native"
import Svg from "react-native-svg";
//spinner para el control de la petición
import Spinner from 'react-native-loading-spinner-overlay';
//recursos para hacer la llamada al api
import {ApiUrl, getHeaders} from "../../constants";


//función que reconstruye los valores del item para poder trabajar de acuerdo a los controles de esta pantalla
const configureItem=(item)=>{
   let newValue={}
   //configuracion del valor
   newValue.value=item.progreso
   let tmp = item.progreso*100
   newValue.arcValues=[
    { x: "Tarea", y: 100-tmp},
    { x: "", y: tmp }
   ]
   newValue.item=item;
   newValue.flag=tmp
   return newValue;

}
class TaskDetails extends Component {
    constructor(props){
        super(props);
        const {navigation}=props;
        let newValue=configureItem(navigation.getParam('item', 'NO-Item'))
        this.state={
            value:newValue.value,
            valorTarea:newValue.arcValues, 
            etiqueta:newValue.flag+"%", 
            item:newValue.item, 
            spinner:false
        }
    }
    //llamamos a la función para obtener tareas en el TaskList
    componentWillUnmount() {
        this.props.navigation.state.params.getTasks()
    }
    //función que permite el cambio de las actividades
    changeValue=(value)=>{
        let tmp=value*100
        let newValue=[
            { x: "Tarea", y: 100-tmp},
            { x: "", y: tmp }
        ]
        this.setState({
            value:value, 
            valorTarea:newValue,
            etiqueta:tmp+"%"
        })
    }

    //funcion que se utiliza para poder actualizar en el API del valor del progreso
    setTaskNewValue=()=>{
        this.setState({
            spinner:true
        })
        getHeaders()
                .then((myConfig)=>{
                    fetch(ApiUrl+'/app_api/setTaskProgress',{
                        method:"POST",
                        body:JSON.stringify({
                            "task":this.state.item.tarea, 
                            "value":this.state.value
                        }),
                        headers:myConfig.headers,                         
                    })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        //se tiene que crear un loading
                        this.setState({
                            spinner:false
                        })
                    })
                    .catch((error) =>{
                        console.error(error);
                    });
                });
    }
    


    render() {
        
        return (
            <Card title={this.state.item.nombre} titleStyle={{fontSize:20}} titleNumberOfLines={2}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Cargando...'}
                    textStyle={styles.spinnerTextStyle}
                    overlayColor={"#BDBDBD"}
                />
                <View style={{marginLeft:-30, marginBottom:-30}}>     
                <Svg style={{height:225, marginTop:-50}}> 
                    <VictoryPie
                        data={this.state.valorTarea}
                        innerRadius={120}
                        cornerRadius={25}
                        labels={() => null}
                        style={{
                            data: { fill: (d) => {
                                const color = d.y < 30 ? "red" : "green";
                                return d.x === "" ? color : "transparent";
                                }
                            }
                        }}
                        startAngle={90}
                        endAngle={-90}
                    />
                    <VictoryLabel
                        textAnchor="middle"
                        style={{ fontSize: 40}}
                        x={190} y={140}
                        text={this.state.etiqueta}
                    />
                </Svg> 
                
                </View>
                <Divider />
                <ListItem
                    title="Duraci&oacute;n"
                    subtitle={this.state.item.duracion+" días"}
                    leftIcon={{name:"av-timer"}}
                />
                <Divider />
                <View marginBottom={20} marginTop={20}>
                    <Slider
                        value={this.state.value}
                        onValueChange={this.changeValue}
                        step={0.25}
                        thumbTintColor={"black"}
                    />
                </View>
                <Divider />
                <View style={{marginTop:10}} >
                    <Button
                        buttonStyle={{
                            borderColor:"green"
                        }}
                        titleStyle={{color:"green"}}
                        icon={{
                            name: "save",
                            size: 15,
                            color: "green"
                        }}
                        title="Guardar Avance"
                        type="outline"
                        onPress={this.setTaskNewValue}
                    />
                </View>
                
            </Card>
            
        );
    }
}
export default TaskDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },spinnerTextStyle: {
        color: '#FFF'
      },
});