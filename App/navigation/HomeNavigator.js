import React from 'react';
import {StackNavigator} from "react-navigation";
import Colors from '../constants/Colors';
import HomeScreen from '../screens/main/HomeScreen';
import TypeScreen from "../screens/getmusic/TypeScreen";
import ExpertCategoryScreen from "../screens/getmusic/ExpertCategoryScreen";
import TeacherCategoryScreen from "../screens/getmusic/TeacherCategoryScreen";
import SelectExpertScreen from "../screens/getmusic/SelectExpertScreen";
import ExpertProfileScreen from "../screens/getmusic/ExpertProfileScreen";
import BookingFormScreen from "../screens/getmusic/BookingFormScreen";
import {View} from "react-native";
import BookingDetailsScreen from "../screens/main/BookingDetailsScreen";

export default StackNavigator({
        HomeScreen: {
            screen: HomeScreen,
            navigationOptions: {
                title: 'GetGut',
            }
        },
        TypeScreen: {
            screen: TypeScreen,
            navigationOptions: {
                title: 'Get Music',
                headerRight: <View/>,
            }
        },
        ExpertCategory: {
            screen: ExpertCategoryScreen,
            navigationOptions: {
                title: 'Expert Category',
                headerRight: <View/>,
            }
        },
        TeacherCategory: {
            screen: TeacherCategoryScreen,
            navigationOptions: {
                title: 'Teacher Category',
                headerRight: <View/>,
            }
        },
        SelectExpert: {
            screen: SelectExpertScreen,
            navigationOptions: {
                headerRight: <View/>,
            }
        },
        ExpertProfile: {
            screen: ExpertProfileScreen,
            navigationOptions: {
                headerRight: <View/>,
            }
        },
        BookingForm: {
            screen: BookingFormScreen,
            navigationOptions: {
                title: 'Book Expert',
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
