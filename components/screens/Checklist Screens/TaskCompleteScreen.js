import React from 'react';
import {StyleSheet, KeyboardAvoidingView, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import TopBar from '../../mainbars/TopBar';
import TopSubBar from '../../mainbars/TopSubBar';
import firebase from 'react-native-firebase';

export default class TaskCompleteScreen extends React.Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('progress');
  }
    static navigationOptions = {
        header: null
    }

    updateDatabase() {
      //
      var doc = this.ref.doc('zC1lDflQSHq0hLOhMT8b');
      var data = doc.get();
      console.log(data);
      doc.set({
        today: doc.data().today + 20,
        weekly: (doc.data().weekly + (1/22)) * 100
      });
    }

    render() {
        this.updateDatabase();
        return (
            <KeyboardAvoidingView style = {styles.container}>
                <TopBar />
                <TopSubBar />

                <View style = {styles.headerContainer}>
                    <View style = {styles.rowContainer}>
                        <Text style = {styles.headerText}>CHORE COMPLETE!</Text>
                        <Text>   </Text>
                        <TouchableOpacity onPress = {() => {
                            this.props.navigation.navigate('Checklist');
                        }}>
                            <Icon name = 'close' size = {25}></Icon>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style = {styles.placeText}>
                    Thanks for completing: <Text style = {styles.NFCtext}>{this.props.navigation.state.params.choreComplete}</Text>!
                </Text>

                <Icon name = 'checksquareo' color = '#009986' size = {100} />

                <Text style = {styles.placeText}>
                    You have been awarded <Text style = {styles.NFCtext}>15</Text> points.
                </Text>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'lightgray',
        width: '100%',
        padding: '3%'
      },
    rowContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
    },
    headerText: {
        flex: 1,
        color: '#009986',
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: 25
    },
    scanInText: {
        alignSelf: 'center',
        fontSize: 16,
        padding: '5%'
    },
    placeText: {
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 20,
        padding: '5%'
    },
    NFCtext: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});
