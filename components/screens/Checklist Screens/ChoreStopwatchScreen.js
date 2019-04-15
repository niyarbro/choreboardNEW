import React from 'react';
import {StyleSheet, KeyboardAvoidingView, View, Text, TouchableOpacity} from 'react-native';
import {Stopwatch} from 'react-native-stopwatch-timer';
import Icon from 'react-native-vector-icons/AntDesign';

import TopBar from '../../mainbars/TopBar';
import TopSubBar from '../../mainbars/TopSubBar';

export default class MessagesScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            currTime: 0,
            isStarted: true,
            choreComplete: ''
        };
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
        color: 'gray',
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