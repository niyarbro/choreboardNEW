import React from 'react';
import {StyleSheet, KeyboardAvoidingView, ScrollView, View,
    Text, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import Icon from 'react-native-vector-icons/AntDesign';
import NfcManager, {Ndef, NfcTech, ByteParser} from 'react-native-nfc-manager';

import TopBar from '../../mainbars/TopBar';
import TopSubBar from '../../mainbars/TopSubBar';
import {myChores, openChores} from '../../data/Chores';

export default class ChecklistScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            viewMyChoresList: true, //default list view
            viewOpenChoresList: false,
            activeSections: [],
            supported: false,
            tag: {}
        };
    }

    componentDidMount() {
        NfcManager.isSupported()
            .then(result => {
                console.log("componentDidMount 'supported' state after isSupported call: " + result);
                this.setState({supported: result});
                if (result) {
                    this.startNFC();
                }
            });
    }

    componentWillUnmount() {
        if (this._stateChangedSubscription) {
            this._stateChangedSubscription.remove();
        }
    }

    startNFC() {
        //starting
        NfcManager.start()
            .then(result => {
                console.log("NFC started!");
            })
            .catch(err => {
                console.log("Nope.");
                console.log(err);
            });

        //checking if NFC is enabled
        NfcManager.isEnabled()
            .then(result => {
                console.log("NFC is enabled!");
                console.log(result);
            })
            .catch(err => {
                console.log("Error in enabling NFC.");
                console.log(err);
            });
            
        NfcManager.registerTagEvent(this.tagDiscovered)
            .then(result => {
                console.log('Detecting...', result);
            })
            .catch(err => {
                console.warn('Detecting failed!', err);
            });
    }

    tagDiscovered = tag => {
        console.log('TAG DISCOVERED!!!');
        console.log(tag);
        this.setState({tag});
    }

    setSections = (sections) => {
        this.setState({activeSections: sections.includes(undefined) ? [] : sections});
    };

    renderHeader = (section, _, isActive) => {
        return (
            <Animatable.View style = {styles.header} duration = {400} transition = 'backgroundColor'>
                <View style = {styles.subHeader}>
                    <Text style = {styles.headerText}>{section.category}</Text>
                    <Icon name = {isActive ? 'caretup' : 'caretdown'} size = {20} />
                </View>
            </Animatable.View>
        );
    };
    
    renderContent = (section, _, isActive) => {
        return (
            <Animatable.View
                style = {[styles.header, {
                    backgroundColor: isActive ? 'white' : 'lightgray'
                }]}
                duration = {400}
                transition = 'backgroundColor'>
                {section.subcategory.map((item, key) => (
                    <View key = {key} style = {styles.item}>
                        <TouchableOpacity
                            onPress = {() => this.props.navigation.navigate('ChecklistStart', {chore: item.value})}>
                            <Text style = {styles.text} animation = {isActive ? 'bounceIn' : undefined}>
                                {item.value}
                            </Text>
                        </TouchableOpacity>
                        <View style = {styles.separator} />
                    </View>
                ))}
            </Animatable.View>
        );
    };

    renderChoreList() {
        if (this.state.viewMyChoresList && !this.state.viewOpenChoresList) {
            return (
                <ScrollView style = {{width: '100%'}}>
                    <Accordion
                        activeSections = {this.state.activeSections}
                        sections = {myChores}
                        touchableComponent = {TouchableWithoutFeedback}
                        expandMultiple = {true}
                        renderHeader = {this.renderHeader}
                        renderContent = {this.renderContent}
                        duration = {400}
                        onChange = {this.setSections}
                    />
                </ScrollView>
            );
        } else if (this.state.viewOpenChoresList && !this.state.viewMyChoresList) {
            return (
                <ScrollView style = {{width: '100%'}}>
                    <Accordion
                        activeSections = {this.state.activeSections}
                        sections = {openChores}
                        touchableComponent = {TouchableWithoutFeedback}
                        expandMultiple = {true}
                        renderHeader = {this.renderHeader}
                        renderContent = {this.renderContent}
                        duration = {400}
                        onChange = {this.setSections}
                    />
                </ScrollView>
            );
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style = {styles.container}>
                <TopBar />
                <TopSubBar />

                <View style = {styles.rowContainer}>
                    <TouchableOpacity
                        style = {[button.container, {
                            backgroundColor: this.state.viewMyChoresList ? '#009986' : 'lightgray' 
                        }]}
                        activeOpacity = {.25}
                        onPress = {() => {this.setState({
                            viewMyChoresList: true,
                            viewOpenChoresList: false
                        })}}>
                        <Text style = {[button.text, {
                            color: this.state.viewMyChoresList ? 'white' : 'gray'
                        }]}>
                            MY CHORES
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = {[button.container, {
                            backgroundColor: this.state.viewOpenChoresList ? '#009986' : 'lightgray'
                        }]}
                        activeOpacity = {.25}
                        onPress = {() => {this.setState({
                            viewMyChoresList: false,
                            viewOpenChoresList: true
                        })}}>
                        <Text style = {[button.text, {
                            color: this.state.viewOpenChoresList ? 'white' : 'gray'
                        }]}>
                            OPEN CHORES
                        </Text>
                    </TouchableOpacity>
                </View>
                {this.renderChoreList()}              
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
    rowContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'gray',
        width: '100%',
        flexDirection: 'row',
        padding: 5
    },
    header: {
        backgroundColor: 'lightgray',
        padding: '3%',
        width: '100%'
    },
    subHeader: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        width: '100%'
    },
    headerText: {
        fontSize: 16,
        fontWeight: '500'
    },
    separator: {
        height: 1,
        backgroundColor: 'lightgray',
        width: '100%'
    },
    text: {
        fontSize: 20,
        color: 'gray',
        padding: '3%'
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        justifyContent: 'center'
    }
});

const button = {
    container: {
        alignSelf: 'center',
        width: '45%'
    },
    text: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 30
    }
};