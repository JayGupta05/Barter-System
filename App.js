import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import LoginSignupScreen from './screens/LoginSignupScreen';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import { TabNavigator } from './components/TabNavigator';
import { AppDrawer } from './components/AppDrawer';

export default class App extends React.Component{
  render(){
    return (
      <AppContainer/>
    );
  }
}

const SwitchNavigator = createSwitchNavigator({
  LoginSignupScreen:{
    screen:LoginSignupScreen,
  },
  Sidebar:{
    screen:AppDrawer,
  }
}) 

const AppContainer = createAppContainer(SwitchNavigator);