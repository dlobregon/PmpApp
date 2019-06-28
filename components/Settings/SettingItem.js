import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	Dimensions,
} from 'react-native';

import deviceStorage  from '../Common/MyStorage'

const { height, width } = Dimensions.get('window');

class SettingItem extends Component {

	constructor(props){
        super(props);
        this.state = {nombre_usuario:""}
        this.logout = this.logout.bind(this);
    }
    
    componentDidMount()
    {
        deviceStorage.getItem("nombre_usuario")
        .then((nombre_usuario)=>{
          if(nombre_usuario && nombre_usuario !== "")
            this.setState({nombre_usuario:nombre_usuario});
          else
            return;
        });
	}
	
	

    logout(){
        deviceStorage.setItem("logged", "");
        deviceStorage.setItem("user","");
        deviceStorage.setItem("nombre_usuario", "");
        deviceStorage.setItem("user_token", "");
        this.props.navigation.navigate('Loading')
    }
	
	render(){
		return (
			<View style={style.container}>
				<Image source={require('../../assets/logo-GAP-letras.png')} style={style.image} />
				<Text style={style.text}> Actualmente tu sesión es del usuario: {this.state.nombre_usuario} </Text>
				<TouchableOpacity style={style.button} onPress={this.logout}> 
					<Text style={style.buttonText}> Cerrar Sesión </Text>
				</TouchableOpacity>
			</View>
			)
	}
}


// shortcut for mapping dispatch to props
export default SettingItem;

const style = StyleSheet.create({
	container:{
		backgroundColor: '#fcfcfc', 
		flex:1,
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	image:{
		height: height/3,
		width: width/3,
		resizeMode: 'contain'
	},
	text:{
		fontSize: 15,
		fontWeight: 'normal',
		marginTop: -10
	},
	button: {
		backgroundColor: '#e74c3c',
		minWidth: width/2,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		shadowOpacity: 0.4,
		shadowOffset: {width:0 , height:0},
		shadowRadius: 3,
		marginTop: 40
	},
	buttonText:{
		color: '#fff',
		fontWeight: 'bold'
	}
})