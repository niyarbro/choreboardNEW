import React from 'react';
import {StyleSheet, KeyboardAvoidingView, View, Text, TouchableOpacity} from 'react-native';
import {Header} from 'react-navigation';

import TopBar from '../../mainbars/TopBar';
import TopSubBar from '../../mainbars/TopSubBar';
import Icon from 'react-native-vector-icons/AntDesign';

export default class ChecklistStartScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <KeyboardAvoidingView 
                keyboardVerticalOffset = {Header.HEIGHT + 15}
                style = {styles.container}
                behavior = 'padding'>
                <TopBar />
                <TopSubBar />

                <View style = {styles.headerContainer}>
                    <View style = {styles.rowContainer}>
                        <Text style = {styles.headerText}>CHECK-IN FROM CHECKLIST</Text>
                        <TouchableOpacity onPress = {() => this.props.navigation.navigate('Checklist')}>
                            <Icon name = 'close' size = {25}></Icon>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style = {styles.placeText}>Ready to begin: <Text style = {styles.NFCtext}>{this.props.navigation.state.params.chore}</Text>?</Text>
                
                <TouchableOpacity
                    style = {button.container}
                    onPress = {() => {
                        console.log('has started!');
                        this.props.navigation.navigate('ChoreStopwatch', {chore: this.props.navigation.state.params.chore});
                    }}>
                    <Text style = {button.text}>START</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
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
    textFieldContainer: {
        padding: '5%'
    },
    headerText: {
        color: '#009986',
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: 25
    },
    placeText: {
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 20,
        padding: '5%'
    },
    NFCtext: {
        fontSize: 20,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    scanInText: {
        flex: 1,
        alignSelf: 'center',
        fontSize: 16
    }

});

const button = {
    container: {
        alignSelf: 'center',
        borderWidth: 3,
        borderRadius: 10,
        borderColor: '#009986',
        width: '50%'
    },
    text: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: '#009986',
        fontSize: 40
    }
};