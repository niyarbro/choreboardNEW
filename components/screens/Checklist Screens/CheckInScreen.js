import React from 'react';
import {StyleSheet, KeyboardAvoidingView, ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-material-dropdown';
import {TextField} from 'react-native-material-textfield';
import {Header} from 'react-navigation';

import TopBar from '../../mainbars/TopBar';
import TopSubBar from '../../mainbars/TopSubBar';
import Icon from 'react-native-vector-icons/AntDesign';

import {chores} from '../../data/Chores';

export default class CheckInScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chore: '',
            otherChore: '',
            buttonIsDisabled: true,
            textFieldIsDisabled: true
        };
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
                        <Text style = {styles.headerText}>NEW CHECK-IN</Text>
                        <TouchableOpacity onPress = {() => this.props.navigation.navigate('Dashboard')}>
                            <Icon name = 'close' size = {25}></Icon>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text />
                <ScrollView>
                    <Text style = {styles.placeText}>
                        It looks like you've checked in at the <Text style = {styles.NFCtext}>[PLACE AFTER NFC SCAN]</Text>
                        . Please select your chore:
                    </Text>

                    <Dropdown
                        containerStyle = {{padding: '5%'}}
                        label = 'Select a chore.'
                        data = {chores}
                        onChangeText = {(value) => {
                            if (value == null) {
                                this.setState({buttonIsDisabled: true});
                                this.setState({textFieldIsDisabled: true});
                            } else if (value != null && value != 'Other (add a new chore)') {
                                this.setState({buttonIsDisabled: false});
                                this.setState({textFieldIsDisabled: true});
                            } else if (value == 'Other (add a new chore)') {
                                if (this.state.otherChore == null || this.state.otherChore == '') {
                                    this.setState({buttonIsDisabled: true});
                                } else {
                                    this.setState({buttonIsDisabled: false});
                                }
                                this.setState({textFieldIsDisabled: false});
                            }
                            this.setState({chore: value});
                        }}
                        value = {this.state.chore}
                        selectedItemColor = '#009986'
                    />

                    <Text></Text>
                    <TouchableOpacity
                        style = {[button.container, {
                            opacity: this.state.buttonIsDisabled ? .5 : 1,
                            borderColor: this.state.buttonIsDisabled ? 'lightgray' : '#009986'}
                        ]}
                        disabled = {this.state.buttonIsDisabled}
                        onPress = {() => {
                            if (this.state.chore == 'Other (add a new chore)'
                                && (this.state.otherChore != null || this.state.otherChore != '')) {
                                console.log(this.state.otherChore + ' has started!');
                                this.props.navigation.navigate('ChoreStopwatch', {chore: this.state.otherChore});
                            } else {
                                console.log(this.state.chore + ' has started!');
                                this.props.navigation.navigate('ChoreStopwatch', {chore: this.state.chore});
                            }
                        }}>
                        <Text style = {[button.text, {
                            color: this.state.buttonIsDisabled ? 'lightgray' : '#009986'
                        }]}>START</Text>
                    </TouchableOpacity>

                    <TextField
                        containerStyle = {styles.textFieldContainer}
                        label = "Describe new chore if 'Other' is chosen."
                        value = {this.state.otherChore}
                        disabled = {this.state.textFieldIsDisabled}
                        onChangeText = {(value) => {
                            if (value == null || value == '') {
                                this.setState({buttonIsDisabled: true});
                            } else if (value != null || value != '') {
                                this.setState({buttonIsDisabled: false})
                            }
                            this.setState({otherChore: value})
                        }}
                    />

                    <Text style = {styles.scanInText}>Scan in at the station again once the task is complete.</Text>
                </ScrollView>

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
        width: '50%'
    },
    text: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 40
    }
};