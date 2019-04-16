import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Header extends React.Component {
  render() {
    return (
      <View style = {styles.container}>
          

          <Text style = {styles.timeText}>3D : 10H : 32M</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    width: '100%',
    padding: '4%'
  },
  rowContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
  },
  familyText: {
    color: 'gray',
    alignSelf: 'flex-start',
    fontWeight: 'bold'
  },
  timeRemainingText: {
      color: 'gray',
      alignSelf: 'flex-end',
      fontWeight: 'bold',
      flexDirection: 'row',
  },
  timeText: {
    color: 'gray',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    fontSize: 20
  }

});
