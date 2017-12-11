import React from 'react';
import {StackNavigator} from "react-navigation";
import Colors from '../constants/Colors';
import {View} from "react-native";
import BookingDetailsScreen from "../screens/main/BookingDetailsScreen";
import BookingScreen from "../screens/main/BookingScreen";

export default StackNavigator({
        BookingScreen: {
            screen: BookingScreen,
            navigationOptions: {
                title: 'My Orders',
            }
        },
        BookingDetails: {
            screen: BookingDetailsScreen,
            navigationOptions: {
                title: 'Order Details',
                headerRight: <View/>,
            }
        },
    },
    {
        navigationOptions: () => ({
            headerTitleStyle: {
                fontWeight: 'normal',
                color: '#FFF',
                alignSelf: 'center',
            },
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: Colors.tintColor,
                elevation: 0,
                borderBottomWidth: 0,
            },
            headerBackTitle: null,
        }),
    });