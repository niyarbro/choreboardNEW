import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconDie from 'react-native-vector-icons/Foundation';

export default class AwardsBar extends React.Component {
  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.rowContainer}>
          <Text style = {styles.giftText}><IconDie name = 'die-four' color = 'gray'></IconDie> Highest Player Points</Text>
          <Text style = {styles.gameCategoryText}><Icon name = 'gift' color = 'gray'></Icon> 2 Extra Video Game Hours</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'gainsboro',
    width: '100%'
  },
  rowContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
  },
  gameCategoryText: {
    alignSelf: 'flex-start',
    color: 'gray',
    fontSize: 16,
    padding: '4%'
  },
  giftText: {
    alignSelf: 'flex-end',
    color: 'gray',
    fontSize: 16,
    padding: '4%'
  }
  
});
