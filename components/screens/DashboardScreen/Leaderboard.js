import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#3296ca',
        borderBottomWidth: 1,
        width: '100%',
        padding: 13
    },
    otherHalfContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '88%'
    },
    profilePictureContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf:  'center',
        alignItems: 'flex-start'
    },
    profilePicture: {
        width: 40,
        height: 40,
        tintColor: '#3296ca',
        borderRadius: 360,
        position: 'relative'
    },
    placeText: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3296ca',
        alignSelf: 'center'
    },
    nameText: {
        fontSize: 20,
        color: '#3296ca',
        alignSelf: 'center',
        alignItems: 'center'
    },
    pointsTextContainer: {
        flex: .3,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf:  'center',
        alignItems: 'flex-end'
    },
    pointsText: {
        fontSize: 20,
        color: '#3296ca',
        alignSelf: 'center',
        alignItems: 'center'
    }
});

export var Leaderboard = (props) => (
    <View style = {styles.container}>
        <Text style = {styles.placeText}>#{`${props.place}`}</Text>
        <Text> </Text>
        <View style = {styles.otherHalfContainer}>
            <View style = {styles.profilePictureContainer}>
                <Image style = {styles.profilePicture} source = {require('../../../images/default-svg.png')}></Image>
                <Text style = {styles.nameText}> {`${props.name.first} ${props.name.last}`}</Text>
            </View>
            <Text> </Text>
            <View style = {styles.pointsTextContainer}>
                <Text style = {styles.pointsText}>{`${props.points}`} points</Text>
            </View>
        </View>
    </View>
);