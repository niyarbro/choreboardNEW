import React from 'react';
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';

import DashboardScreen from './components/screens/DashboardScreen/DashboardScreen';
import ChecklistScreen from './components/screens/Checklist Screens/ChecklistScreen';
import CheckInScreen from './components/screens/Checklist Screens/CheckInScreen';
import ChecklistStartScreen from './components/screens/Checklist Screens/ChecklistStartScreen';
import ChoreStopwatchScreen from './components/screens/Checklist Screens/ChoreStopwatchScreen';
import TaskCompleteScreen from './components/screens/Checklist Screens/TaskCompleteScreen';
import StatisticsScreen from './components/screens/StatisticsScreen/StatisticsScreen';
import MessagesScreen from './components/screens/MessagesScreen/MessagesScreen';

const ChecklistStack = createStackNavigator({
    Checklist: ChecklistScreen,
    ChecklistStart: ChecklistStartScreen,
    CheckIn: CheckInScreen,
    ChoreStopwatch: ChoreStopwatchScreen,
    TaskComplete: TaskCompleteScreen,
});

const AppContainer = createAppContainer(
    createBottomTabNavigator({
        Dashboard: {
            screen: DashboardScreen,
            navigationOptions: {
                tabBarLabel: 'dashboard',
                tabBarIcon: ({}) => (
                    <Icon name = 'dashboard' size = {28} color = 'gray' />
                )
            }
        },
        ChecklistStackNav: {
            screen: ChecklistStack,
            navigationOptions: {
                tabBarLabel: 'checklist',
                tabBarIcon: ({}) => (
                    <Icon name = 'checksquareo' size = {28} color = 'gray' />
                )
            }
        },
        Statistics: {
            screen: StatisticsScreen,
            navigationOptions: {
                tabBarLabel: 'statistics',
                tabBarIcon: ({}) => (
                    <Icon name = 'linechart' size = {28} color = 'gray' />
                )
            }
        },
        Messages: {
            screen: MessagesScreen,
            navigationOptions: {
                tabBarLabel: 'messages',
                tabBarIcon: ({}) => (
                    <Icon name = 'mail' size = {28} color = 'gray' />
                )
            }
        }
    })
);

export default AppContainer;