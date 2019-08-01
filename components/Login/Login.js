// Login.js

import React from 'react'
import { StyleSheet, Text, TextInput, View, Button,Image,Dimensions , KeyboardAvoidingView} from 'react-native'


import deviceStorage  from '../Common/MyStorage'
import {ApiUrl} from "../../constants";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const {height, width} = Dimensions.get("window");


export default class Login extends React.Component {
  state = { username: '', password: '', errorMessage: null }
  

  componentDidMount() {
    this.verificarAutenticacion();
  }
  
  verificarAutenticacion(){
    deviceStorage.getItem("user")
    .then((user)=>{
      if(user && user !== "")
      this.props.navigation.navigate('Main')
      else
        return;
    });
  }

  handleLogin = () => {
    let usuario ={usuario:{"nombre_usuario":this.state.username,"password":this.state.password}};
    fetch(ApiUrl+'/usuarios/login',
    {
      method: 'POST', // or 'PUT'
      body:JSON.stringify(usuario), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(response=>response.json())
    .then((response) =>{
      if(response.success===1){
        deviceStorage.setItem("logged", "1");
        deviceStorage.setItem("user",response.usuarios.usuario);
        deviceStorage.setItem("nombre_usuario", response.usuarios.nombre_usuario);
        deviceStorage.setItem("user_token", response.usuarios.token);
        this.props.navigation.navigate('Loading')
      }else{
        alert("No se pudo autenticar al usuario")
      }
    })
    .catch((error) =>{
      alert("Hubo un error al autenticar al usuario")
      console.error(error);
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}behavior="padding">
        <Image
          source={require('../../assets/logo-GAP-letras.png')}
        />
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Username"
          onChangeText={username => this.setState({ username })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button color="#3498db" title="Iniciar Sesión" onPress={this.handleLogin} style={styles.mybutton} />
        <View style={{ height: 60 }} />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: wp('90%'),
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    marginBottom:10
  },
  mybutton: {
		backgroundColor: '#3498db',
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
})