import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import deviceStorage  from '../Common/MyStorage'

export default class Loading extends React.Component {

componentDidMount() {
    this.verificarAutenticacion();
}

verificarAutenticacion(){
  deviceStorage.getItem("user")
  .then((user)=>{
    if(user && user !== "")
        this.props.navigation.navigate('Main')
    else
        this.props.navigation.navigate('Login')
  });
}

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})