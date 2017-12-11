import React from 'react';
import ScreenContainer from '../../components/ScreenContainer';
import {
  BackHandler, StyleSheet, StatusBar, ScrollView
} from 'react-native';
import { Text, TouchableOpacity, View,Image } from '@shoutem/ui';
import {connect} from "react-redux";
import GetMusicActions from "../../redux/BookingRedux";
import Colors from "../../constants/Colors";
import {Col, Grid, Row} from "../../components/Grid";
import Styles from "../../constants/Styles/Styles";

class ExpertCategoryScreen extends React.Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        const { navigation } = this.props;
        if (navigation.index === 0) {
            return false;
        }
        navigation.goBack();
        return true;
    };

    render()
    {
        const { navigate } = this.props.navigation;
        const category = [
            {value: 'band', label: 'Band / Group'},
            {value: 'dj', label: 'DJ'},
            {value: 'orchestra', label: 'Orchestra'},
            {value: 'session_player', label: 'Session Player'},
            {value: 'singer', label: 'Singer'},
        ];
        return (
            <ScreenContainer>
                <ScrollView>
                    <View style={styles.typeContainer}>
                        {category.map(cat => (
                            <TouchableOpacity
                                key={cat.value}
                                style={styles.types}
                                onPress={() => navigate('SelectExpert', {section: 'get_music',type: 'expert', category: cat.value, categoryLabel: cat.label})}>
                                <View style={styles.title}>
                                    <Text style={styles.titleText}>{cat.label}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </ScreenContainer>
        );
    }
}

const styles = {
    typeContainer: {
        margin: 3,
    },
    types: {
        backgroundColor: '#FFF',
        marginBottom: 3,
    },
    title: {
        padding: 17,
        paddingTop: 15,
        paddingBottom: 15,
    },
    titleText: {
        backgroundColor: 'transparent',
        color: '#333',
        fontWeight: 'bold',
        fontSize: 16,
    },
    subTitleText: {
        backgroundColor: 'transparent',
        color: '#666',
        fontSize: 12,
    },
    typesLink: {
        backgroundColor: 'transparent',
        color: Colors.tintColor,
        fontWeight: 'bold',
        fontSize: 11,
        marginTop: 10,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(null, mapDispatchToProps)(ExpertCategoryScreen);
