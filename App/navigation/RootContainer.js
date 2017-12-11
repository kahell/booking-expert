import React, { Component } from 'react';
import { View, StatusBar, Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import StartupActions from '../redux/StartupRedux';
import ReduxPersist from '../config/ReduxPersist';
import RootNavigation from "./RootNavigation";


class RootContainer extends Component {
    componentDidMount () {
        // if redux persist is not active fire startup action
        if (!ReduxPersist.active) {
            this.props.startup();
        }
    }

    render () {
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
                <RootNavigation />
            </View>
        );
    }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
    startup: () => dispatch(StartupActions.startup())
});

export default connect(null, mapDispatchToProps)(RootContainer);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    statusBarUnderlay: {
        height: 24,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
});