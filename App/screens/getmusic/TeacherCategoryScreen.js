import React from 'react';
import ScreenContainer from '../../components/ScreenContainer';
import {
  BackHandler, StyleSheet, StatusBar, ScrollView
} from 'react-native';
import {connect} from "react-redux";
import GetMusicActions from "../../redux/BookingRedux";
import Colors from "../../constants/Colors";
import {Col, Grid, Row} from "../../components/Grid";
import Styles from "../../constants/Styles/Styles";
import { Text, TouchableOpacity, View } from '@shoutem/ui';

class TeacherCategoryScreen extends React.Component {

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
            {value: 'bass', label: 'Bass'},
            {value: 'cello', label: 'Cello'},
            {value: 'clarinet', label: 'Clarinet'},
            {value: 'dj', label: 'DJ'},
            {value: 'drum', label: 'Drum'},
            {value: 'flute', label: 'Flute'},
            {value: 'guitar', label: 'Guitar'},
            {value: 'harmonica', label: 'Harmonica'},
            {value: 'percussion', label: 'Percussion'},
            {value: 'piano', label: 'Piano'},
            {value: 'saxophone', label: 'Saxophone'},
            {value: 'trumpet', label: 'Trumpet'},
            {value: 'violin', label: 'Violin'},
            {value: 'vocal', label: 'Vocal'},
        ];
        return (
            <ScreenContainer>
                <ScrollView>
                    <View style={styles.typeContainer}>
                        {category.map(cat => (
                            <TouchableOpacity
                                key={cat.value}
                                style={styles.types}
                                onPress={() => navigate('SelectExpert', {section: 'get_music', type: 'teacher', category: cat.value, categoryLabel: cat.label})}>
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

export default connect(null, mapDispatchToProps)(TeacherCategoryScreen);
