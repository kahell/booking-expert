import React from 'react';
import ScreenContainer from '../../components/ScreenContainer';
import {
    BackHandler, StyleSheet, StatusBar, ScrollView
} from 'react-native';
import {connect} from "react-redux";
import Colors from "../../constants/Colors";
import {TouchableOpacity,Caption, GridRow, Card, View, Title, Subtitle, Heading, Text } from '@shoutem/ui';

class TypeScreen extends React.Component {

    componentWillMount() {
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
        return (
            <ScreenContainer>
                <ScrollView>
                    <View style={styles.typeContainer}>
                        <TouchableOpacity style={styles.types} onPress={() => navigate('ExpertCategory')}>
                            <View style={styles.title}>
                              <Text style={styles.titleText}>GET EXPERT</Text>
                              <Text style={styles.subTitleText}>Book your favorite music experts.</Text>
                              <Text style={styles.typesLink}>BOOK NOW</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.types} onPress={() => navigate('TeacherCategory')}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>GET TEACHER</Text>
                                <Text style={styles.subTitleText}>Want to learn music? Book a teacher.</Text>
                                <Text style={styles.typesLink}>BOOK NOW</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={StyleSheet.flatten([styles.types, {backgroundColor: '#DDD'}])}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>GET OFFER</Text>
                                <Text style={styles.subTitleText}>Have a project? Get the best deal here.</Text>
                                <Text style={styles.typesLink}>COMING SOON</Text>
                            </View>
                        </View>
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

export default connect(null, mapDispatchToProps)(TypeScreen);
