import {createDrawerNavigator} from 'react-navigation-drawer';
import {TabNavigator} from './TabNavigator';
import CustomSidebar from './CustomSidebar';
import SettingsScreen from '../screens/SettingsScreen';

export const AppDrawer = createDrawerNavigator({
    Home : {
        screen:TabNavigator
    },
    Settings : {
        screen:SettingsScreen
    }    
},{
    contentComponent : CustomSidebar
},{
    initialRouteName : 'Home'
})