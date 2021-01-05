import {createDrawerNavigator} from 'react-navigation-drawer';
import {TabNavigator} from './TabNavigator';
import CustomSidebar from './CustomSidebar';

export const AppDrawer = createDrawerNavigator({
    Home : {
        screen:TabNavigator
    }    
},{
    contentComponent : CustomSidebar
},{
    initialRouteName : 'Home'
})