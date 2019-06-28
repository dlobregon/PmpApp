import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'

export default class Main extends React.Component {
  state = { currentUser: null }

  componentDidMount() {
    this.verificarAutenticacion();
  }

  verificarAutenticacion(){
    deviceStorage.getItem("user")
    .then((user)=>{
      if(user && user !== "")
          return;
      else
          this.props.navigation.navigate('Login')
    });
  }



render() {
    const { currentUser } = this.state

return (
      <View style={styles.container}>
        <Text>
          Hi {currentUser && currentUser.email}!
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})