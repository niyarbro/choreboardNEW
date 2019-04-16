import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconDie from 'react-native-vector-icons/Foundation';

export default class AwardsBar extends React.Component {
  render() {
    return (
      <View style = {styles.container}>
        <Text style = {styles.leaderboardText}>LEADERBOARD</Text>
        <View style = {styles.rowContainer}>
          <Text style = {styles.giftText}><IconDie name = 'die-four' color = '#3296ca' size = {20}></IconDie> Highest Player Points</Text>
          <Text style = {styles.gameCategoryText}><Icon name = 'gift' color = '#3296ca' size = {20}></Icon> 2 Extra Video Game Hours</Text>
        </View>
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
    padding: '3%'
  },
  rowContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
  },
  gameCategoryText: {
    alignSelf: 'flex-start',
    color: '#3296ca',
    fontSize: 20,
  },
  giftText: {
    alignSelf: 'flex-end',
    color: '#3296ca',
    fontSize: 20,
  },
  leaderboardText: {
    color: '#3296ca',
    alignSelf: 'center',
    fontSize: 40,
  },
  
});
