import {createStackNavigator} from 'react-navigation-stack';
import ExchangeScreen from '../screens/ExchangeScreen';
import LoginSignupScreen from '../screens/LoginSignupScreen';

export const StackNavigator = createStackNavigator({
    ExchangeScreen:{
        screen:ExchangeScreen,
        navigationOptions:{
            headerShown:false,
        }
    }, 
    LoginSignupScreen:{
        screen:LoginSignupScreen,
        navigationOptions:{
            headerShown:false,
        }
    },
},{
    initialRouteName:"ExchangeScreen"
},)