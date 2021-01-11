import {createDrawerNavigator} from 'react-navigation-drawer';
import {TabNavigator} from './TabNavigator';
import CustomSidebar from './CustomSidebar';
import SettingsScreen from '../screens/SettingsScreen';
import MyExchanges from '../screens/MyExchanges';

export const AppDrawer = createDrawerNavigator({
    Home : {
        screen:TabNavigator
    },
    MyExchanges : {
        screen:MyExchanges
    },
    Settings : {
        screen:SettingsScreen
    }    
},{
    contentComponent : CustomSidebar
},{
    initialRouteName : 'Home'
})