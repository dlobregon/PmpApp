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


class TaskDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            value:0.75,
            valorTarea:[
                { x: "Tarea", y: 25 },
                { x: "", y: 75}
            ], 
            etiqueta:"75%"
        }
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

    render() {
        return (
            <Card title="Tarea" titleStyle={{fontSize:20}} titleNumberOfLines={2}>
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
                    subtitle="17 d&iacute;as"
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
    }
});