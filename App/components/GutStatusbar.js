import React from "react";
import {StatusBar, View, Platform} from "react-native";
import Colors from '../constants/Colors'

class GutStatusbar extends React.Component {
    render()
    {
        if(Platform.OS === 'ios')
        {
            return (
                <View>
                    <StatusBar
                        translucent={true}
                        backgroundColor={Colors.tintColor}
                        barStyle={'light-content'}
                    />
                </View>
            );
        }

        return null;
    }
}

export default GutStatusbar;