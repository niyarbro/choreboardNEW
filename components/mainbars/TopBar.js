import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class TopBar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.text}>choreboard</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
    width: '100%'
  },
  text: {
    color: 'white'
  }
});
