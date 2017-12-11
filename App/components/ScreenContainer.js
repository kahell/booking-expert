import React from 'react';
import {Image} from "react-native";
import background from '../assets/images/background.jpg';
import Styles from "../constants/Styles/Styles";

class ScreenContainer extends React.Component {
    render () {
        const {children} = this.props;
        return (
            <Image source={background} style={Styles.background}>
                {children}
            </Image>
        );
    }
}

export default ScreenContainer;