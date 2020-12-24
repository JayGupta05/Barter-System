import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import LoginSignupScreen from './screens/LoginSignupScreen';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import { TabNavigator } from './components/TabNavigator';

export default class App extends React.Component{
  render(){
    return (
      <View>
        <AppContainer/>
      </View>
    );
  }
}

const SwitchNavigator = createSwitchNavigator({
  LoginSignupScreen:{
    screen:LoginSignupScreen,
  },
  BottomTab:{
    screen:TabNavigator,
  }
}) 

const AppContainer = createAppContainer(SwitchNavigator);