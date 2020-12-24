import * as React from 'react';
import {Image} from 'react-native';
import ExchangeScreen from '../screens/ExchangeScreen';
import HomeScreen from '../screens/HomeScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';

export const TabNavigator = createBottomTabNavigator({
    HomeScreen:{
        screen:HomeScreen,
        navigationOptions:{
            tabBarIcon:<Image source ={require('../assets/home.png')} style={{width:20,height:20}}/>,
            tabBarLabel:'Home Screen'
        }
    },
    ExchangeScreen:{
        screen:ExchangeScreen,
        navigationOptions:{
            tabBarIcon:<Image source ={require('../assets/exchange.jpg')} style={{width:20,height:20}}/>,
            tabBarLabel:'Exchange Books'
        }
    }
})