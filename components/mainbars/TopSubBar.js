import React from 'react';
import {StyleSheet, Text, View, Image, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import firebase from 'react-native-firebase';
export default class TopSubBar extends React.Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('progress');
    this.state = {
      today: 40,
      weekly: 15/22 * 100,
      loading: true
    };
    this.unsubscribe = null;
  }

  onDataUpdate(todayNumber, weeklyNumber) {
    this.state.today = todayNumber;
    this.state.weekly = weeklyNumber;
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
  // TODO
  console.log(querySnapshot.docs[0].data());
  console.log(querySnapshot.docs[0].id);
  this.setState({
    today: querySnapshot.docs[0].data().today,
    weekly: querySnapshot.docs[0].data().weekly,
    loading: false
  });
  }

  render() {
    if (this.state.loading) {
      return null;
    }
    const barWidth = Dimensions.get('screen').width - 40;
    const progressCustomStyles = {
      backgroundColor: 'orange',
      borderRadius: 0,
      borderColor: 'blue'
    }

    return (
      <View style = {styles.container}>
        <View style = {styles.profileContainer}>
          <View style = {styles.profilePictureContainer}>
            <Image style = {styles.profilePicture} source = {require('../../images/default-svg.png')}></Image>
            <Text style = {styles.welcome}>Welcome, Blake!</Text>
          </View>
          <TouchableOpacity onPress = {() => {return alert("What's this menu?");}} style = {styles.icon}>
            <Icon name = 'dots-three-horizontal' color = 'white' size = {30}></Icon>
          </TouchableOpacity>
        </View>
        <View style = {styles.barContainer}>
          <Text style = {styles.subtitle}>TODAY'S CHORES:</Text>
          <ProgressBarAnimated width = {barWidth} value = {this.state.today} backgroundColor = 'orange' backgroundColorOnComplete = '#009986' />
          <Text style = {styles.subtitleFraction}>2/5</Text>
          <Text style = {styles.subtitle}>TOTAL WEEKLY CHORES:</Text>
          <ProgressBarAnimated width = {barWidth} value = {this.state.weekly} backgroundColor = 'orange' backgroundColorOnComplete = '#009986' />
          <Text style = {styles.subtitleFraction}>15/22</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3296ca',
    width: '100%'
  },
  welcome: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: '1%'
  },
  subtitle: {
    color: 'white',
    fontSize: 10,
    alignSelf: 'flex-start',
    padding: '1%'
  },
  subtitleFraction: {
    color: 'white',
    fontSize: 10,
    alignSelf: 'flex-end',
    padding: '1%'
  },
  barContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: '1%'
  },
  profileContainer: {
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '1%',
    flexDirection: 'row',
    width: '92%'
  },
  profilePictureContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'flex-start'
  },
  profilePicture: {
    width: 40,
    height: 40,
    tintColor: 'white',
    borderRadius: 360,
    position: 'relative',
    alignSelf: 'flex-start',
  },
  icon: {
    alignSelf: 'center',
    alignItems: 'center',
    padding: '1%'
  }

});
