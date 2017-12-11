import React from 'react';
import {StyleSheet} from 'react-native';
import { View } from '@shoutem/ui';
import Styles from "../constants/Styles/Styles";

class LoadingScreen extends React.Component {
    render () {
        return (
            <View style={StyleSheet.flatten([Styles.container, Styles.background, {backgroundColor: '#fff'}])} />
        )
    }
}

export default LoadingScreen;
