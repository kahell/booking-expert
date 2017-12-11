import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Colors from '../constants/Colors';
import NotificationScreen from "../screens/main/NotificationScreen";
import ProfileScreen from "../screens/main/ProfileScreen";
import HomeNavigator from "./HomeNavigator";
import BookingNavigator from "./BookingNavigator";

export default TabNavigator(
  {
    Home: {
      screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            header: null,
        }
    },
    /*Notification: {
      screen: NotificationScreen,
        navigationOptions: {
            title: 'Notifications',
        }
    },*/
    Booking: {
      screen: BookingNavigator,
        navigationOptions: {
            title: 'My Orders',
            header: null,
        }
    },
    Profile: {
      screen: ProfileScreen,
        navigationOptions: {
            title: 'My Profile',
        }
    },
    /*More: {
      screen: MoreScreen,
        navigationOptions: {
            title: 'More',
        }
    },*/
  },
  {
    headerMode: 'screen',
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = `ios-home${focused ? '' : '-outline'}`;
            break;
          case 'Notification':
              iconName = `ios-notifications${focused ? '' : '-outline'}`;
              break;
            case 'Booking':
                iconName = `ios-paper${focused ? '' : '-outline'}`;
                break;
            case 'Profile':
                iconName = `ios-person${focused ? '' : '-outline'}`;
                break;
            case 'More':
                iconName = `ios-more${focused ? '' : '-outline'}`;
                break;
        }
        return (
          <Ionicons
            name={iconName}
            size={26}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
      tabBarOptions: {
          activeTintColor: Colors.tabIconSelected,
          inactiveTintColor: Colors.tabIconDefault,
          tabStyle: {
              backgroundColor: Colors.tintColor,
              paddingTop: 5,
              paddingBottom: 5,
          },
          style: {
              borderTopWidth: 0,
              backgroundColor: Colors.tintColor,
          },
      },
  }
);
