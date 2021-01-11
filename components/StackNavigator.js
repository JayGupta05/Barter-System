import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import ReceiverScreen from '../screens/ReceiverScreen';

export const StackNavigator = createStackNavigator({
    itemDonateList:{
        screen:HomeScreen,
        navigationOptions:{
            headerShown:false,
        }
    }, 
    receiverScreen:{
        screen:ReceiverScreen,
        navigationOptions:{
            headerShown:false,
        }
    },
},{
    initialRouteName:"itemDonateList"
},)