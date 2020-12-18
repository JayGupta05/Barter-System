import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import LoginSignupScreen from './screens/LoginSignupScreen';
import {createAppContainer,} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {StackNavigator} from './components/StackNavigator';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <View>
      <LoginSignupScreen/>
    </View>
  );
}

const TabNavigator = createBottomTabNavigator({
  ExchangeScreen:{
    screen:StackNavigator,
    navigationOptions:{
      tabBarIcon:<Image source ={require('./assets/exchange.jpg')} style={{width:20,height:20}}/>,
      tabBarLabel:'Exchange'
    }
  },
  HomeScreen:{
    screen:HomeScreen,
    navigationOptions:{
      tabBarIcon:<Image source={require('./assets/home.png')} style={{width:20,height:20}}/>,
      tabBarLabel:'HomeScreen'
    }
  }
})

const AppContainer = createAppContainer(TabNavigator);