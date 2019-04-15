import React from 'react';
import {StyleSheet, KeyboardAvoidingView, FlatList, ScrollView} from 'react-native';

import TopBar from '../../mainbars/TopBar';
import TopSubBar from '../../mainbars/TopSubBar';
import Header from './Header';
import AwardsBar from './AwardsBar';

import {Leaderboard} from './Leaderboard';
import {profiles} from '../../data/Profiles';

export default class DashboardScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: profiles
        };
    }

    render() {
        return (
            <KeyboardAvoidingView style = {styles.container}>
                <TopBar />
                <TopSubBar />
                <Header />
                <AwardsBar />
                <ScrollView>
                    <FlatList
                        data = {this.state.dataSource}
                        keyExtractor = {(item, index) => index.toString()}
                        renderItem = {({item}) => <Leaderboard {...item} />}
                    />
                </ScrollView>
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
    listContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%'
    }
});