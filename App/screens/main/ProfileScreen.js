import React from 'react';
import {StyleSheet} from 'react-native';
import ScreenContainer from "../../components/ScreenContainer";
import {connect} from "react-redux";
import Styles from "../../constants/Styles/Styles";
import LoginActions from "../../redux/LoginRedux";
import { Text, TouchableOpacity, View } from '@shoutem/ui';

class ProfileScreen extends React.Component {

    render() {
        return (
            <ScreenContainer>
                <View style={styles.container}>
                    <View style={styles.userContainer}>
                        <Text style={styles.username}>{this.props.user.name}</Text>
                        <Text style={styles.phone}>{this.props.user.phone_number}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.props.attemptLogout()}
                        style={StyleSheet.flatten([Styles.button, styles.logoutButton])}
                    >
                        <Text style={Styles.buttonText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </ScreenContainer>
        );
    }
}

const styles = {
    container: {
        flex:1,
        margin: 50,
        marginTop: 30,
    },
    userContainer: {
        padding: 15,
        backgroundColor: '#333',
    },
    username: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold'
    },
    phone: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 12,
    },
    logoutButton: {
        alignSelf: 'center',
        paddingHorizontal: 30,
        marginTop: 30,
    }
};

const mapStateToProps = (state) => {
    return {
        user: state.login.user,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        attemptLogout: () => dispatch(LoginActions.logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
