import React from 'react';
import {StyleSheet, KeyboardAvoidingView, View, Text, TouchableOpacity} from 'react-native';
import {Stopwatch} from 'react-native-stopwatch-timer';
import Icon from 'react-native-vector-icons/AntDesign';
import NfcManager from 'react-native-nfc-manager';

import TopBar from '../../mainbars/TopBar';
import TopSubBar from '../../mainbars/TopSubBar';

export default class MessagesScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            currTime: 0,
            isStarted: true,
            choreComplete: ''
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this._isMounted && NfcManager.registerTagEvent(this.tagFound)
            .then(result => {
                console.log('Waiting for scan to finish chore...', result);
            })
            .catch(err => {
                console.warn('Detecting failed!', err);
            });
    }

    componentWillUnmount() {
        if (this._stateChangedSubscription) {
            this._stateChangedSubscription.remove();
        }
        this._isMounted = false;
    }

    tagFound = tag => {
        console.log(tag.id + " has been scanned again for chore completion!");
        console.log('Time is ' + currTime);
        this.setState({isStarted: false});
        console.log(`${this.props.navigation.state.params.chore} has ended.`);
        this._isMounted && NfcManager.unregisterTagEvent()
            .then(result => {
                this.props.navigation.navigate('TaskComplete', {
                    choreComplete: this.props.navigation.state.params.chore
                });
            });
    }

    
    render() {
        return (
            <KeyboardAvoidingView style = {styles.container}>
                <TopBar />
                <TopSubBar />

                <View style = {styles.headerContainer}>
                    <View style = {styles.rowContainer}>
                        <Text style = {styles.headerText}>{this.props.navigation.state.params.chore}</Text>
                        <Text>   </Text>
                        <TouchableOpacity onPress = {() => {
                            console.log(`${this.props.navigation.state.params.chore} has stopped manually.`);
                            this.props.navigation.navigate('CheckIn');
                        }}>
                            <Icon name = 'close' size = {25}></Icon>
                        </TouchableOpacity>
                    </View>
                </View>

                <Text />
                <Stopwatch
                    start = {this.state.isStarted}
                    reset = {true}
                    options = {stopwatchStyle}
                    getTime = {(time) => {
                        currTime = time;
                    }}
                />

                <Text />
                <TouchableOpacity style = {button.container}
                    onPress ={() => {
                        console.log('Time is ' + currTime);
                        this.setState({isStarted: false});
                        console.log(`${this.props.navigation.state.params.chore} has ended.`);
                        this.props.navigation.navigate('TaskComplete', {
                            choreComplete: this.props.navigation.state.params.chore
                        });
                    }}>
                    <Text style = {button.text}>FINISH</Text>
                </TouchableOpacity>

                <Text style = {styles.scanInText}>Scan in at the station again once the task is complete.</Text>
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
        backgroundColor: 'white',
        width: '100%',
        padding: '3%',
        borderBottomColor: '#3296ca',
        borderBottomWidth: 2
      },
    rowContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
    },
    headerText: {
        flex: 1,
        color: '#3296ca',
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: 25
    },
    scanInText: {
        alignSelf: 'center',
        fontSize: 16,
        padding: '5%'
    }
});

const stopwatchStyle = {
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    text: {
        color: '#3296ca',
        fontSize: 100
    }
};

const button = {
    container: {
        backgroundColor: 'white',
        alignSelf: 'center',
        borderColor: 'red',
        borderWidth: 3,
        borderRadius: 10,
        width: '50%'
    },
    text: {
        alignSelf: 'center',
        color: 'red',
        fontWeight: 'bold',
        fontSize: 40
    }
};