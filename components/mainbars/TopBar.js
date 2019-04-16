import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

export default class TopBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style = {styles.picture} source = {require('../../images/cblogo.png')}></Image>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%'
  },
  picture: {
    alignSelf: 'center',
    width: 100,
    height: 50,
    position: 'relative'
  },
});
