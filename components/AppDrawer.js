import {createDrawerNavigator} from 'react-navigation-drawer';
import {TabNavigator} from './TabNavigator';
import CustomSidebar from './CustomSidebar';
import SettingsScreen from '../screens/SettingsScreen';
import MyExchanges from '../screens/MyExchanges';
import Notifications from '../screens/Notifications';

export const AppDrawer = createDrawerNavigator({
    Home : {
        screen:TabNavigator
    },
    MyExchanges : {
        screen:MyExchanges
    },
    Notifications : {
        screen:Notifications,
    },
    Settings : {
        screen:SettingsScreen
    }    
},{
    contentComponent : CustomSidebar
},{
    initialRouteName : 'Home'
})